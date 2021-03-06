import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, View, Button, TextInput, ScrollView } from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import moment from 'moment';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderColor: 'red',
    borderWidth: 1
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};


const Homepage = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(
    [
      {
        date: moment().format('LL'),
        amount: 2000
      },
      {
        date: moment().subtract(1, 'days').format('LL'),
        amount: 3500
      },
      {
        date: moment().subtract(1, 'days').format('LL'),
        amount: 3500
      },
      {
        date: moment().subtract(1, 'days').format('LL'),
        amount: 4500
      },
      {
        date: moment().subtract(4, 'days').format('LL'),
        amount: 5500
      }
    ]
  );

  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, 'date')));
  }, [data]);


  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job',
      amount: 499,
      timestamp: new Date()
    },
    {
      description: 'Freelance job',
      amount: 799.99,
      timestamp: new Date()
    }
  ]);

  //console.log(data);

  const getDates = () => {
    const dates = transformedData.map(pair => {
      return pair.date;
    });
    return dates;
  };

  const getAmounts = () => {
    const amounts = transformedData.map(pair => {
      return pair.amount;
    });
    return amounts;
  };

  const transformData = (groupedData) => {
    const transformedArray = [];
    Object.entries(groupedData).forEach(entry => {
      const total = entry[1].reduce((acc, pair) => acc + pair.amount, 0);
      transformedArray.push({ date: moment(entry[0]).format('MM/DD'), amount: total });
    });
    const sortedArray = transformedArray.sort((a, b) => moment(a['date']).diff(moment(b['date'])));
    return sortedArray;
  };

  //console.log(getDates());
  //console.log(getAmounts());
  //console.log('Grouped values are', groupBy(data, 'date'));
  //console.log('Transformed data', transformData(groupBy(data, 'date')));


  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  const addGig = () => {
    setGigs([...gigs, {
      description: description,
      amount: amount,
      timestamp: new Date()
    }]);
    setDescription('');
    setAmount('');
    setData([
      ...data,
      {
        date: moment().format('LL'),
        amount: Number(amount)
      }
    ]);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={ styles.titleText }>I am working here</Text>
      </View>
      <Button title="Login" onPress = {() =>navigation.navigate('Login')}/>
      <View>
        <Text>Total amount:
        ${ total }
        </Text>
        <LineChart
          data={ {
            labels: getDates(),
            datasets: [{
              data: getAmounts()
            }]
          } }
          width={ Dimensions.get('window').width }
          height={ 220 }
          yAxisLabel={ '$' }
          chartConfig={ {
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: null,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          } }
          bezier
          style={ {
            marginVertical: 8,
            borderRadius: 16
          } }
        />
      </View>
      <TextInput
        style={ styles.input }
        value={ description }
        placeholder="Enter a description"
        onChangeText={ text => setDescription(text) }
      />
      <TextInput
        style={ styles.input }
        value={ amount }
        keyboardType='numeric'
        placeholder="Enter amount you made"
        onChangeText={ text => setAmount(text) }
      />

      <Button disabled={ !amount || !description } onPress={ addGig } title="ADD GIG"></Button>
      <ScrollView>
        { gigs.map(gig => (
          <View>
            <Text>{ gig.description }</Text>
            <Text>${ gig.amount }</Text>
          </View>
        )) }
      </ScrollView>
    </SafeAreaView>
  );

};

export default Homepage;
