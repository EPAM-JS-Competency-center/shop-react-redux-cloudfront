import errorImg from "./error.gif";

const ErrorMessage = () => {
  return (
    <div>
      <img
        alt="Error"
        style={{
          display: "block",
          width: "300px",
          height: "auto",
          objectFit: "contain",
          margin: "0 auto",
        }}
        src={errorImg}
      />
    </div>
  );
};

export default ErrorMessage;
