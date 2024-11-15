import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Error() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <h1>NotFound</h1>
      <Button variant="dark" onClick={handleClick}>
        Go to Home
      </Button>
    </>
  );
}