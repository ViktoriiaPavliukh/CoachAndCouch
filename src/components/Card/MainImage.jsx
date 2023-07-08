import mainImage from 'shared/templates/Frame 868.webp';
export function MainImage({ src, ...props }) {
  return (
    <img
      src={src || mainImage}
      alt="Teacher's profile"
      style={{ width: '473px', height: '362px', borderRadius: '16px' }}
    />
  );
}
