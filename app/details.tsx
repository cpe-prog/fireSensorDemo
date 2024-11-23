import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Details() {
	return (
		<View>
			<Stack.Screen
				options={{
					title: "Details",
					headerStyle: { backgroundColor: "#f4511e" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},

					headerTitle: "Details",
				}}
			/>
			<Text>Details Screen</Text>
		</View>
	);
}
