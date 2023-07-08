import { List, ListItem } from '@mui/material';

export function CategoryList({ elements }) {
  return (
    <List
      sx={{
        display: 'flex',
        mb: 2.5,
        mt: 1,
        gap: 1,
        p: 0,
        color: 'grey.400',
      }}
    >
      {elements.map(e => (
        <ListItem
          sx={{
            padding: '4px 8px',
            border: '1px solid lightgrey',
            borderRadius: '16px',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'calc(16 / 12)',
            width: 'auto',
            color: 'text.primary',
          }}
          key={e.id}
        >
          {e.label}
        </ListItem>
      ))}
    </List>
  );
}
