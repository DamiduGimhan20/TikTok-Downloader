# TikTok Video Downloader

TikTok Video Downloader is a React Native application that allows users to download videos from TikTok using a video URL. The app uses the RapidAPI service to fetch the video download link and the Expo FileSystem module to save the video locally on the device.

## Features

- Download TikTok videos using the video URL.
- Simple and intuitive user interface.
- Uses Expo LinearGradient for a visually appealing background.
- Error handling for invalid URLs and download failures.


## Installation

To get started with TikTok Video Downloader, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DamiduGimhan20/TikTok-Downloader.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd TikTok-Downloader
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root of the project and add your RapidAPI Key and Host:

    ```env
    RAPIDAPI_KEY=your_rapidapi_key
    RAPIDAPI_HOST=tiktok-downloader25.p.rapidapi.com
    ```

5. **Start the project using Expo:**

    ```bash
    npx expo start
    ```

## Running the App on Your Device

1. **Install the Expo Go app** on your iOS or Android device from the App Store or Google Play Store.
2. **Open the Expo Go app** and scan the QR code displayed in the terminal or browser after running `npx expo start`.

## Usage

1. Enter the TikTok video URL in the input field.
2. Press the "Download" button.
3. The app will download the video and save it to the device's file system.
4. A message will be displayed upon successful download, indicating the file's location.

## Project Structure

- `App.js`: The main application component.
- `assets`: Directory for static assets such as images and icons.

## Dependencies

- React
- React Native
- Expo
- Axios
- Expo LinearGradient
- Expo FileSystem
- react-native-dotenv

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- TikTok video download API: [RapidAPI](https://rapidapi.com/)
- Gradient colors inspiration: [uigradients](https://uigradients.com/)

## Contact

For any inquiries or support, please open an issue on the [GitHub repository](https://github.com/DamiduGimhan20/TikTok-Downloader/issues).

---

Thank you for using TikTok Video Downloader!
