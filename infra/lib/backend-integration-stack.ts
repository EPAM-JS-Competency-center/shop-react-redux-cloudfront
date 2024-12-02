import * as cdk from 'aws-cdk-lib';
import {Construct} from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import {aws_apigateway as apigateway} from 'aws-cdk-lib';
import * as path from 'path';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import {Port, SecurityGroup} from "aws-cdk-lib/aws-ec2";


const lambdaAppDir = path.resolve(__dirname, '../../BE')

export class BackendIntegrationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const databaseName = 'ProductDatabase';

        const dbCredentialsSecret = new rds.DatabaseSecret(this, 'MyCredsProductDatabase', {
            secretName: 'MyCredsProductDatabase',
            username: 'davydova_IAM'
        });

        const vpc = new ec2.Vpc(this, 'VPCProductDB', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    name: 'PublicSubnet',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    name: 'PrivateSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                },
                {
                    name: 'IsolatedSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                },
            ],
        });
        const rdsSecurityGroup = new SecurityGroup(
            this,
            'RDSSecurityGroupProductDB', {
            vpc,
            description: 'Allow access to RDS instance',
            allowAllOutbound: true,
        });

        const lambdaSecurityGroup = new SecurityGroup(
            this, 'LambdaSecurityGroupProductDB', {
            vpc,
            description: 'Allow access to Lambda function',
            allowAllOutbound: true,
        });

        rdsSecurityGroup.addIngressRule(
            lambdaSecurityGroup,
            Port.tcp(5432),
            'Allow PostgreSQL access from Lambda',
            )



        const dbInstance = new rds.DatabaseInstance(this, 'InstanceProductDB', {
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_16_4
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            vpc,
            credentials: rds.Credentials.fromSecret(dbCredentialsSecret),
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
            multiAz: false,
            allocatedStorage: 20,
            deleteAutomatedBackups: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            deletionProtection: false,
            databaseName: databaseName,
            securityGroups: [rdsSecurityGroup],
            publiclyAccessible: false
        });


        const lambdaFunction = new lambdaNodejs.NodejsFunction(this, 'FunctionConnectionProductDB', {
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(15),
            handler: 'handler',
            architecture: lambda.Architecture.ARM_64,
            projectRoot: lambdaAppDir,
            entry: path.join(lambdaAppDir, '../nodejs-aws-cart-api/dist/main.js'),
            bundling: {
                externalModules: ['aws-sdk', '@nestjs/microservices', 'class-transformer', '@nestjs/websockets/socket-module', 'cache-manager', 'class-validator'],
            },
            vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
            },
            securityGroups: [lambdaSecurityGroup],
            environment: {
                RDS_USERNAME: 'davydova_IAM',
                RDS_HOSTNAME: dbInstance.dbInstanceEndpointAddress,
                RDS_PORT: dbInstance.dbInstanceEndpointPort.toString(),
                RDS_DB_NAME: databaseName
            }
        })

        const api = new apigateway.RestApi(this, 'APIProductDB', {
            restApiName: 'Nest Service',
            description: 'This service serves a Nest.js application.',
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });

        const getLambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction);
        api.root.addMethod('ANY', getLambdaIntegration);
        api.root.addProxy({
            defaultIntegration: getLambdaIntegration,
            anyMethod: true,
        });


    }
}