import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import DropDown from '../UIs/DropDown';
import Table from '../UIs/Table';

const StyledBody = Styled.main``;
const StyledContainer = Styled.section`
    width: 100%;
    height: 100vh;
`;
const StyledSelectContainer = Styled.article`
    width:100;
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.flexDirection || 'flex-end'};
    background-color: ${props => props.background || 'gray'};
    padding: 2rem 0.5rem;
`;
const StyledTitle = Styled.span`
    color: #67c462;
    font-size: 2rem;
    font-weight: bold;
    margin-right: auto;
    @media only screen and (max-width: 550px){
        margin-bottom: 1rem;
    }
`;
const StyledTitleCryptoBook = Styled.h2`
 text-align :center;
 margin-bottom: 0;
`;
const StyledOption = Styled.option`
    color:gray;
    width: 100%;
`;
const StyledTableArea = Styled.section`
    width: 100%;
    height: 80vh;
`;

const CryptoBook = () => {
  const [options, setOptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://www.bitstamp.net/api/v2/trading-pairs-info/', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        const formatedResult = result.map(element => element.name);
        setOptions(formatedResult);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  /**
   * Handles data streaming(Websockect connection) when currency value pairs change
   * @param {String} value
   */
  const onChangeHandler = value => {
    setSelectedPair(value);
    const socket = new WebSocket('wss://ws.bitstamp.net');
    const subscribe = {
      event: 'bts:subscribe',
      data: {
        channel: `order_book_${value.replace('/', '').toLowerCase()}`
      }
    };

    socket.onclose = () => {
      socket.close();
    };
    socket.onopen = () => {
      socket.send(JSON.stringify(subscribe));
    };
    socket.onmessage = e => {
      const response = JSON.parse(e.data);
      setOrders(response.data);
    };
  };

  /**
   * Renders Select options
   */
  const renderOptions = () =>
    options.length &&
    options.map((option, index) => (
      <StyledOption key={index}>{option}</StyledOption>
    ));
  /**
   * Renders Table rows
   * @param {array} dataPack
   */
  const tableRows = dataPack =>
    dataPack.map((data, index) => (
      <tr key={`${index}-${dataPack}`}>
        <td>{data[0]}</td>
        <td>{data[1]}</td>
      </tr>
    ));

  return (
    <StyledBody>
      <StyledContainer>
        <StyledSelectContainer>
          <StyledTitle>Busha</StyledTitle>
          <DropDown handleChanege={onChangeHandler}>{renderOptions()}</DropDown>
        </StyledSelectContainer>
        <StyledTableArea>
          <StyledTitleCryptoBook>Crypto Order Book</StyledTitleCryptoBook>
          <StyledSelectContainer flexDirection="flex-start" background="white">
            <Table tableName="Bids" pairName={selectedPair}>
              {tableRows(orders.bids ? orders.bids : [])}
            </Table>
            <Table tableName="Asks" pairName={selectedPair}>
              {tableRows(orders.asks ? orders.asks : [])}
            </Table>
          </StyledSelectContainer>
        </StyledTableArea>
      </StyledContainer>
    </StyledBody>
  );
};

export default CryptoBook;
