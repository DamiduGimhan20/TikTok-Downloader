import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env';

const App = () => {
  // State variables to manage the input URL, message display, and loading indicator
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Request permissions to access the media library on component mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is required!');
      }
    };

    requestPermissions();
  }, []);

  // Function to handle video download
  const downloadVideo = useCallback(async (videoUrl) => {
    const options = {
      method: 'GET',
      url: 'https://tiktok-downloader25.p.rapidapi.com/tiktok',
      params: { tiktokUrl: videoUrl },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    };

    try {
      setLoading(true); // Show loading indicator
      const response = await axios.request(options);
      console.log('API Response:', JSON.stringify(response.data, null, 2)); // Log the full response

      // Check if the response contains a video URL
      if (response.data && response.data.media && response.data.media.videos && response.data.media.videos.length > 0) {
        const videoLink = response.data.media.videos[0];
        const path = `${FileSystem.documentDirectory}video.mp4`;

        // Start the download process
        const downloadResumable = FileSystem.createDownloadResumable(
          videoLink,
          path
        );

        const { uri } = await downloadResumable.downloadAsync();

        // Save the downloaded video to the user's download folder
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        setLoading(false); // Hide loading indicator
        setMessage('Download complete!');
        Alert.alert('Download complete!', 'Video saved to Downloads');
      } else {
        throw new Error('No video URL found in response');
      }
    } catch (error) {
      setLoading(false); // Hide loading indicator in case of error
      console.error('Error:', error);
      Alert.alert('Error', `An error occurred while downloading the video: ${error.message}`);
    }
  }, []);

  // Function to handle the download button click event
  const handleDownload = () => {
    if (url.trim()) {
      downloadVideo(url);
    } else {
      setMessage('Please enter a valid URL');
      Alert.alert('Invalid URL', 'Please enter a valid URL');
    }
  };

  return (
    <LinearGradient
      colors={['#A7E6FF', '#3ABEF9', '#3572EF','#3572EF']}
      style={styles.container}
    >
      <View>
        <Text style={styles.topic}>TikTok Video Downloader</Text>
      </View>
      <View style={styles.formcontainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter TikTok URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Download" color={styles.button.color} onPress={handleDownload} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </LinearGradient>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formcontainer:{
    width:'100%',
    height:50
  },
  button: {
    color:'#2C4E80',
  },
  input: {
    height: 55,
    borderColor: '#FF8A08',
    borderWidth: 3,
    marginBottom: 12,
    marginTop: 300,
    paddingHorizontal: 8,
    borderRadius: 10,
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.55, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
    elevation: 50, // Elevation for Android
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
