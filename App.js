import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient
import axios from 'axios'; // Import Axios for HTTP requests
import * as FileSystem from 'expo-file-system'; // Import FileSystem module from Expo for file operations
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env'; // Import environment variables

const App = () => {
  // State variables for URL input and message display
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  // Function to download video from TikTok URL
  const downloadVideo = async (videoUrl) => {
    // Configure Axios request
    const options = {
      method: 'GET',
      url: 'https://tiktok-downloader25.p.rapidapi.com/tiktok',
      params: { tiktokUrl: videoUrl },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY, // Use RapidAPI Key from environment variables
        'X-RapidAPI-Host': RAPIDAPI_HOST, // Use RapidAPI Host from environment variables
      },
    };

    try {
      // Send Axios request to download video
      const response = await axios.request(options);
      console.log('API Response:', response.data); // Log the response data

      // Extract download URL from response
      const videoLink = response.data.downloadUrl;
      const path = `${FileSystem.documentDirectory}video.mp4`; // Set file path for downloaded video

      // Create download resumable object using FileSystem module
      const downloadResumable = FileSystem.createDownloadResumable(
        videoLink,
        path
      );

      // Start download and get download URI
      const { uri } = await downloadResumable.downloadAsync();

      // Update message state with download completion message
      setMessage('Download complete!');
      // Show alert to user about download completion and file location
      Alert.alert('Download complete!', `Video saved to ${uri}`);
    } catch (error) {
      // Handle error if download fails
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while downloading the video.');
    }
  };

  // Function to handle download button press
  const handleDownload = () => {
    if (url) {
      downloadVideo(url); // Call downloadVideo function with provided URL
    } else {
      // Display error message if URL is empty
      setMessage('Please enter a valid URL');
      Alert.alert('Invalid URL', 'Please enter a valid URL');
    }
  };

  // Render UI components using JSX
  return (
    <LinearGradient
      colors={['#FE2C55', '#25F4EE', '#FFFFFF']} // Gradient colors (you can adjust these)
      style={styles.container} // Apply gradient to the container
    >
      {/* Topic */}
      <View>
        <Text style={styles.topic}>TikTok Video Downloader</Text>
      </View>

      {/* Input field for URL */}
      <TextInput
        style={styles.input}
        placeholder="Enter TikTok URL"
        value={url}
        onChangeText={setUrl}
      />

      {/* Download button */}
      <Button title="Download" onPress={handleDownload} />

      {/* Display message if download is complete */}
      {message && <Text style={styles.message}>{message}</Text>}
    </LinearGradient>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 55,
    borderColor: '#000000',
    borderWidth: 2,
    marginBottom: 12,
    marginTop: 300,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
  topic: {
    fontSize: 31,
    marginTop: 50,
    fontWeight: '800',
  },
});

export default App;
