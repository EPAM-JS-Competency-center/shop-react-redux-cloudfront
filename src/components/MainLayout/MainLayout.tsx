import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Header from "components/MainLayout/components/Header";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My deploy AWS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: "lightgray",
    padding: theme.spacing(6),
  },
    footerLink : {
      textDecoration: "none",
        cursor: "pointer",
        color: "grey",
        transition: "0.6s",
        '&:hover': {
            color: "#3f51b5",
            fontWeight: "600"
        }
    },

}));

const MainLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <main>
        <Container className={classes.container} maxWidth="md">
          {children!}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <a className={classes.footerLink} href = "https://github.com/Nazimkov-1984"> by Mykola Nazimkov</a>
        </Typography>
        <Copyright/>
      </footer>
    </>
  );
};

export default MainLayout;