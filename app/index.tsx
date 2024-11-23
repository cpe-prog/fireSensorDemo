import { Stack } from "expo-router";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import database from "../firebase.config";

export default function Home() {
	const [isRelay1On, setIsRelay1On] = useState(false);
	const [isRelay2On, setIsRelay2On] = useState(false);
	const [values, setValues] = useState(null);

	useEffect(() => {
		const path = "Flame/1/flame1";
		const valueRef = ref(database, path);
		const unsubscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setValues(value);
			console.log(JSON.stringify(values));
		});
		return () => unsubscribe();
	}, []);

	const handleRelay1 = async () => {
		const path = "Controls/Relay1";
		const valueRef = ref(database, path);
		await set(valueRef, isRelay1On ? true : false);
		setIsRelay1On((prev) => !prev);
		console.log(valueRef, isRelay1On);
	};

	const handleRelay2 = async () => {
		const path = "Controls/Relay2";
		const valueRef = ref(database, path);
		await set(valueRef, isRelay2On ? true : false);
		setIsRelay2On((prev) => !prev);
		console.log(valueRef, isRelay2On);
	};
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "My home",
					headerStyle: { backgroundColor: "#f4511e" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},

					headerTitle: "Home",
				}}
			/>
			<View className="bg-black w-full h-full">
				<View style={styles.value}>
					<Text className="bg-red-400 font-bold">
						Flame Sensor: {JSON.stringify(values)}
					</Text>
				</View>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					padding: 10,
					height: 200,
					maxWidth: 500,
				}}
			>
				<Button style={styles.Button1} onPress={handleRelay1} mode="contained">
					Pump1
				</Button>
				<Button onPress={handleRelay2} mode="contained">
					Pump2
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 50,
		height: 50,
	},
	text: {
		marginTop: 5,
	},
	div: {
		width: 200,
		height: 200,
		borderBlockColor: "#f2f",
		borderRadius: 5,
		marginBottom: 50,
		marginTop: 100,
		padding: 10,
		shadowColor: "#f2f",
		borderColor: "f2f",
		borderWidth: 2,
	},
	value: {},
	Button1: {
		marginBottom: 20,
	},
});
