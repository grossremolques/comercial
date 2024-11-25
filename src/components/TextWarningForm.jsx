import { Form } from "react-bootstrap";
export function TextWarningForm({ message }) {
  return <div className="form-text text-danger">{message}</div>;
}
export function LabelComponent({ label, required, column, sm }) {
  return (
    <Form.Label
      style={{ color: "#222", fontSize: "0.9rem", fontWeight: "500" }}
      column={column} sm={sm}
    >
      {label} <span className="text-danger">{required && "*"}</span>
    </Form.Label>
  );
}
