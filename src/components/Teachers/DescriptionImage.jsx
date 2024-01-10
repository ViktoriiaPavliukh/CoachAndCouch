import descriptionImage from "@assets/templates/student.png";
export function DescriptionImage() {
  return (
    <img
      src={descriptionImage}
      alt="student"
      style={{
        width: "800px",
      }}
    />
  );
}
