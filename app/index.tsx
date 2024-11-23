import { Stack, Tabs } from "expo-router";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import database from "../firebase.config";

export default function Home() {
	const [isRelay1On, setIsRelay1On] = useState(false);
	const [isRelay2On, setIsRelay2On] = useState(false);
	const [values, setValues] = useState(null);
	const [pump1On, setPump1On] = useState(false);

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
		if (isRelay1On === true) {
			setPump1On(true);
		} else {
			setPump1On(false);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "My home",
					headerStyle: { backgroundColor: "#78a8f5" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},

					headerTitle: "Home",
				}}
			/>
			<Text
				style={{ textAlign: "center", fontWeight: "bold" }}
				variant="displayLarge"
			>
				Fire Monitoring
			</Text>

			<View style={styles.btnContainer}>
				<Button style={styles.btn} onPress={handleRelay1} mode="contained">
					Pump 1
				</Button>
				<Button style={styles.btn} onPress={handleRelay2} mode="contained">
					Pump2
				</Button>
			</View>
			<Tabs />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "100%",
		backgroundColor: "#d7e4fa",
	},
	btn: {},
	btnContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 20,
	},
});
