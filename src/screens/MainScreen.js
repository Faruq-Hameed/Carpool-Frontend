import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <View style={styles.searchCard}>
        <View style={styles.inputGroup}>
          <FontAwesome name="location-arrow" size={20} color="#4CAF50" />
          <TextInput style={styles.input} placeholder="Leaving from" />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="map-marker" size={20} color="#4CAF50" />
          <TextInput style={styles.input} placeholder="Going to" />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="calendar" size={20} color="#4CAF50" />
          <TextInput style={styles.input} placeholder="Today" />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="user" size={20} color="#4CAF50" />
          <TextInput style={styles.input} placeholder="2" keyboardType="numeric" />
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <FontAwesome name="search" size={24} color="#4CAF50" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity style={styles.fab}>
          <Ionicons name="home" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="car" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="user" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#E0F7FA',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default MainScreen;
