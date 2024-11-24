import { Stack, Tabs } from "expo-router";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import database from "../firebase.config";

export default function Home() {
	const [isLamp1On, setIsLamp1On] = useState(false);
	const [isLamp2On, setIsLamp2On] = useState(false);
	const [isLamp3On, setIsLamp3On] = useState(false);
	const [isFan1On, setIsFan1On] = useState(false);
	const [isFan2On, setIsFan2On] = useState(false);
	const [isSprayOn, setIsSprayOn] = useState(false);

	const [values, setValues] = useState(null);

	useEffect(() => {
		const path = "SENSORS/1/flame";
		const valueRef = ref(database, path);
		const unsubscribe = onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setValues(value);
			console.log(JSON.stringify(values));
		});
		return () => unsubscribe();
	}, []);

	const handleLamp1 = async () => {
		const path = "Controls/lamp1";
		const valueRef = ref(database, path);
		await set(valueRef, isLamp1On ? true : false);
		setIsLamp1On((prev) => !prev);
		console.log(valueRef, isLamp1On);
	};

	const handleLamp2 = async () => {
		const path = "Controls/lamp2";
		const valueRef = ref(database, path);
		await set(valueRef, isLamp2On ? true : false);
		setIsLamp2On((prev) => !prev);
		console.log(valueRef, isLamp2On);
	};

	const handleLamp3 = async () => {
		const path = "Controls/lamp3";
		const valueRef = ref(database, path);
		await set(valueRef, isLamp3On ? true : false);
		setIsLamp3On((prev) => !prev);
		console.log(valueRef, isLamp3On);
	};

	const handleFan1 = async () => {
		const path = "Controls/fan1";
		const valueRef = ref(database, path);
		await set(valueRef, isFan1On ? true : false);
		setIsFan1On((prev) => !prev);
		console.log(valueRef, isFan1On);
	};

	const handleFan2 = async () => {
		const path = "Controls/fan2";
		const valueRef = ref(database, path);
		await set(valueRef, isFan2On ? true : false);
		setIsFan2On((prev) => !prev);
		console.log(valueRef, isFan2On);
	};

	const handleSpray = async () => {
		const path = "Controls/spray";
		const valueRef = ref(database, path);
		await set(valueRef, isSprayOn ? true : false);
		setIsSprayOn((prev) => !prev);
		console.log(valueRef, isSprayOn);
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
			<View style={{ alignItems: "center" }}>
				<Text variant="displaySmall">
					Value: {values ? JSON.stringify(values) : "No data Found!"}
				</Text>
			</View>

			<View style={styles.btnContainer}>
				<Button style={styles.btn} onPress={handleLamp1} mode="contained">
					Lamp1
				</Button>
				<Button style={styles.btn} onPress={handleLamp2} mode="contained">
					Lamp2
				</Button>
				<Button style={styles.btn} onPress={handleLamp3} mode="contained">
					Lamp3
				</Button>
			</View>
			<View style={styles.btnContainer}>
				<Button style={styles.btn} onPress={handleFan1} mode="contained">
					Fan1
				</Button>
				<Button style={styles.btn} onPress={handleFan2} mode="contained">
					Fan2
				</Button>
				<Button style={styles.btn} onPress={handleSpray} mode="contained">
					Spray
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
