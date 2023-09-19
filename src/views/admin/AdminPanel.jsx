import { selectToken } from "@/redux/auth/selectors";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { deleteAdvertsById, getAdverts } from "@/redux/marketplace/adverts/operations";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export const AdminPanel = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  console.log(token);
  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);
  const adverts = useSelector(advertsSelector);
  console.log(adverts);
  let count = 0;

  return (
    <>
      <Link to="/announcement">Back to home page</Link>
      <div>Hello</div>
      <h2>Adverts</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Advert</TableCell>
              <TableCell align="left">Edit </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adverts.map((advert) => (
              <TableRow key={advert.id}>
                <TableCell component="th" scope="row">
                  {count++}
                </TableCell>
                <TableCell align="left">
                  {/* {advert.imagePath} */} User name: {advert.user.name} Email: {advert.user.email} <br />
                  Description: {advert.shortDescription} Price: {advert.price}
                  Hobbies:{" "}
                  {advert.hobbies && (
                    <ul>
                      {advert.hobbies.map(({ hobby }, idx) => (
                        <li key={idx}>{hobby}</li>
                      ))}
                    </ul>
                  )}
                  Spoken language:{" "}
                  {advert.spokenLanguages && (
                    <ul>
                      {advert.spokenLanguages.map(({ language }) => (
                        <li key={uuidv4()}>{language}</li>
                      ))}
                    </ul>
                  )}
                  Date create: {advert.createdAt} <br />
                  Advert id: {advert.id}
                </TableCell>

                <TableCell align="right">
                  <Button onClick={() => dispatch(deleteAdvertsById(advert.id))}>Delete advert</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
