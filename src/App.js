import { Route, Routes } from 'react-router-dom';
import { Home, SignIn } from 'views';
import { Layout } from 'components';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<div>SingUP Page</div>} />
      </Route>
    </Routes>
  );
}
