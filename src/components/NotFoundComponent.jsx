import notFoundImg from "../assets/notFoundImage.png";

const NotFoundComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "150px", height: "auto", marginTop: "15px" }}
        src={notFoundImg}
        alt=""
      />
    </div>
  );
};

export default NotFoundComponent;
