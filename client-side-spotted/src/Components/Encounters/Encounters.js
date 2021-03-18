import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import api from '../../Service/api';

export default function Encounters(props) {
    const [limit, setLimit] = useState(14);
    const [encounters, setEncounters] = useState([]);
    const [edit, setEdit] = useState(false);
  
    useEffect(() => {
      async function fetchData() {
        try {
          await api.getEncounters().then(encounters => setEncounters(encounters));
        } catch (err) {
          console.log('error fetching...:', err);
        }
        setEdit(false);
      }
      fetchData();
      window.addEventListener('scroll', handleScroll);
      // eslint-disable-next-line
    }, [edit]);
    const showMore = () => {
      setLimit(prevState => prevState + 8);
      setEdit(true);
    };
  
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        showMore();
    }
  
    const renderEachCoupon = (item, i) => {
      return (
        // <CouponCard index={item._id} coupon={item} key={item._id}></CouponCard>
        <h1>{item}</h1>
      );
    };
  
    return (
      <Grid container className="Coupons">
        {encounters
          .map(renderEachCoupon)
          .reverse()
          .slice(0, limit)}
      </Grid>
    );
  }