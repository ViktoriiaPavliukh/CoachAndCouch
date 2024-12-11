import descriptionImage from "@assets/templates/student.webp";
export function DescriptionImage() {
  return (
    <img
      src={descriptionImage}
      alt="student"
      loading="lazy"
      style={{
        width: "100vw",
      }}
    />
  );
}
