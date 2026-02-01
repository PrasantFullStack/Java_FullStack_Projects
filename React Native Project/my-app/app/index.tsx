 import SplashScreen from "./screens/SplashScreen";

export default function Index() {
  return <SplashScreen />;
}


// import { useEffect } from "react";
// import { Redirect } from "expo-router";
// import { View, ActivityIndicator } from "react-native";
// import { useAuth } from "../context/AuthContext";


// export default function Index() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!user) {
//     return <Redirect href="/auth/login" />;
//   }

//   if (user.role === "Admin") {
//     return <Redirect href="/admin/dashboard" />;
//   }

//   if (user.role === "Seller") {
//     return <Redirect href="/vendor/dashboard" />;
//   }

//   return <Redirect href="/user/profile" />;
// }





// // import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// // import React from "react";
// // import { Link } from "expo-router";

// // type Props = {};

// // const WelcomeScreen = (props: Props) => {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Welcome Screen</Text>
// //       <Link href="/auth/login" asChild>
// //         <TouchableOpacity>
// //           <Text>Go to SignIn Screen</Text>
// //         </TouchableOpacity>
// //       </Link>
// //       <Link href="/auth/register" asChild>
// //         <TouchableOpacity>
// //           <Text>Go to SignUp Screen</Text>
// //         </TouchableOpacity>
// //       </Link>
// //     </View>
// //   );
// // };

// // export default WelcomeScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// // });