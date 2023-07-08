import { Route, Routes } from 'react-router-dom';
import { Home, SignIn, SignUp } from 'views';
import { Card, Layout } from 'components';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="announcement" element={<Card />} />
        <Route path="registration" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
