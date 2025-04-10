 import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { DELETE_BOOK } from '../utils/mutations';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
// import type { User } from '../models/User';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useEffect } from 'react';

const SavedBooks = () => {

  const [removeBook] = useMutation(DELETE_BOOK)

  const { loading, data } = useQuery(QUERY_USER);
useEffect(() => {
  console.log('data', data);
}, [data]);
  // // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

//   useQuery(typeDefs.me) => {
//   const getUserData = async () => {
//     try {
//       const token = Auth.loggedIn() ? Auth.getToken() : null;

//       if (!token) {
//         return false;
//       }

//       const response = await getMe(token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const user = await response.json();
//     } catch (err) {
//       console.error(err);
//     }
//   }
// };

//   getUserData();
// }, [userDataLength]);

// create function that accepts the book's mongo _id value as param and deletes the book from the database
// const handleDeleteBook = async (bookId: string) => {
//   const token = Auth.loggedIn() ? Auth.getToken() : null;

//   if (!token) {
//     return false;
//   }

//   try {
//     const response;

//     if (!response.ok) {
//       throw new Error('something went wrong!');
//     }

//     const updatedUser = await response.json();
//     setUserData(updatedUser);
//     // upon success, remove book's id from localStorage
//     removeBookId(bookId);
//   } catch (err) {
//     console.error(err);
//   }
// };

// if data isn't here yet, say so
if (loading) {
  return (<h2>LOADING...</h2>
  )
}

return (
  <>
    <div className='text-light bg-dark p-5'>
      <Container>
        {data?.me?.username ? (
          <h1>Viewing {data?.me?.username}'s saved books!</h1>
        ) : (
          <h1>Viewing saved books!</h1>
        )}
      </Container>
    </div>
    <Container>
      <h2 className='pt-5'>
        {data?.me?.savedBooks?.length
          ? `Viewing ${data?.me?.savedBooks?.length} saved ${data?.me?.savedBooks?.length === 1 ? 'book' : 'books'
          }:`
          : 'You have no saved books!'}
      </h2>
      <Row>
        {data?.me?.savedBooks?.map((book: any) => {
          return (
            <Col md='4'>
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => removeBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </>
);
};

export default SavedBooks;
