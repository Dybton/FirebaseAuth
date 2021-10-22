import image1 from '../images/albumCoverImages/image1.png';
import image2 from '../images/albumCoverImages/image2.png';
import image3 from '../images/albumCoverImages/image3.png';
import image4 from '../images/albumCoverImages/image4.png';
import image5 from '../images/albumCoverImages/image5.png';
import image6 from '../images/albumCoverImages/image6.png';
import image7 from '../images/albumCoverImages/image7.png';
import image8 from '../images/albumCoverImages/image8.png';
import image9 from '../images/albumCoverImages/image9.png';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'

const bookPage = () => {
  const [user, setUser] = useState([]);

    useEffect(() => {
      getUser();
      console.log(user)
    }, [])
    
    function getUser() {
      db.collection('userObjects').onSnapshot(snapshot => (
          setUser(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
      ))
    }
}

const styles = StyleSheet.create({})



// const bookPage = [
//   {
//     id: 1,
//     title: 'Dogs',
//     author: 'You',
//     background: image1,
//   },
//   {
//     id: 2,
//     title: 'Travel',
//     author: 'You',
//     background: image2,
//   },
//   {
//     id: 3,
//     title: 'Hiking',
//     author: 'Carla',
//     background: image3,
//   },
//   {
//     id: 4,
//     title: 'Night sky',
//     author: 'Jimmy',
//     background: image4,
//   },
//   {
//     id: 5,
//     title: 'Architecture',
//     author: 'Mike',
//     background: image5,
//   },
//   {
//     id: 6,
//     title: 'Art',
//     author: 'Jane',
//     background: image6,
//   },
//   {
//     id: 7,
//     title: 'Camping',
//     author: 'George',
//     background: image7,
//   },
//   {
//     id: 8,
//     title: 'California',
//     author: 'Steven',
//     background: image8,
//   },
//   {
//     id: 8,
//     title: 'Cars',
//     author: 'Claire',
//     background: image9,
//   },
// ];

export default {bookPage};