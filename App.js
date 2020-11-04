import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, SafeAreaView, Button, TextInput, ScrollView } from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import moment from 'moment';





export default function App() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(
    [

      {
        [moment()]: 2000
      },
      {
        [moment().subtract(1, 'days')]: 3500
      },
      {
        [moment().subtract(2, 'days')]: 3500
      },
      {
        [moment().subtract(3, 'days')]: 4500
      },
      {
        [moment().subtract(4, 'days')]: 5500
      }
    ]
  );
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
    const dates = data.map(pair => {
      return Object.keys(pair)[0];
    });
    return dates;
  };

  const getAmounts = () => {
    const amounts = data.map(pair => {
      return Object.values(pair)[0];
    });
    return amounts;
  };

  //console.log(getDates());
  //console.log(getAmounts());


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
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={ styles.titleText }>I am working here</Text>
      </View>
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
}

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
