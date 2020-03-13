import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default function CommonHeader(props) {
  debugger
  console.log(props)
  const mockData = props.module_data;
  const [dataSource, setData] = useState(mockData);
  const [expandedKeys, setExpandedKeys] = useState([0]);

  const osnChange = (status) => {
    console.log(status)
    if (status) {
      setExpandedKeys([status])
    } else {
      setExpandedKeys(expandedKeys)
    }
    setData(dataSource.map((e, k) => {
      return {
        ...e,
        expanded: false,
      }
      // return Object.assign({}, e, { expanded: status });
    }));
  };
  useEffect(() => {
    // document.title = `You clicked ` + Math.random() + ` times`;
  }, [expandedKeys]);
  return (
    <>
      <View style={styles.engine}>
        <Text style={styles.footer}>Engine: 444</Text>
      </View>
      <View style={{ margin: 128 }}>
        <Text onPress={Actions['/test']}>
          /test
          </Text>
      </View>
      <View style={{ margin: 128 }}>
        <Text onPress={Actions['/index']}>
          /index
          </Text>
      </View>
    </>
  );
}
