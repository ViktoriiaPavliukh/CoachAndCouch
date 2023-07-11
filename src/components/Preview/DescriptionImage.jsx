import descriptionImage from 'shared/templates/teachers.svg';
export function DescriptionImage({ src, ...props }) {
  return (
    <img
      src={descriptionImage}
      alt="Teachers"
      style={{ maxWidth: '50%' }}
    />
  );
}
