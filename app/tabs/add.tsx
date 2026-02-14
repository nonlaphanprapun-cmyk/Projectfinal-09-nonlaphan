import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TripPlan = {
  id: string; //ไว้แยกรายการ
  placeName: string;   // ชื่อสถานที่
  budget: string;      // งบประมาณ
};

export default function AddTrip() {
  const [placeName, setPlaceName] = useState(""); //เก็บค่าชื่อสถานที่
  const [budget, setBudget] = useState(""); //เก็บงบประมาณ
  const [allTrips, setAllTrips] = useState<TripPlan[]>([]); //เก็บแพลนทั้งหมดที่มีในเครื่อง

  //โหลดข้อมูลเก่าตอนเปิดหน้า
  useEffect(() => {
    loadTrips();
  }, []);

  //ฟังก์ชันโหลดข้อมูล
  async function loadTrips() {
    const data = await AsyncStorage.getItem("japanTrips");
    if (data !== null) {
      setAllTrips(JSON.parse(data));
    }
  }
//ฟังก์ชันเพิ่มแพลน
  async function addTrip() {
    //ตรวจสอบว่ากรอกครบไหม
    if (!placeName || !budget) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลให้ครบ 🇯🇵");
      return;
    }

    //สร้างแพลนใหม่
    const newTrip: TripPlan = {
      id: Date.now().toString(), //ใช้ Date.now() สร้าง id แบบไม่ซ้ำ
      placeName: placeName,
      budget: budget,
    };

    //รวมข้อมูลเก่ากับใหม่
    const updatedTrips = [...allTrips, newTrip];
    //บันทึกลงเครื่อง
    await AsyncStorage.setItem("japanTrips", JSON.stringify(updatedTrips));

    //อัปเดตหน้าจอ + ล้างช่องกรอก
    setAllTrips(updatedTrips);
    setPlaceName("");
    setBudget("");

    //แจ้งว่าบันทึกสำเร็จ
    Alert.alert("สำเร็จ 🎉", "บันทึกสถานที่เที่ยวเรียบร้อยแล้ว");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        //หัวข้อ
        <Text style={styles.title}>🏯 เพิ่มสถานที่เที่ยวญี่ปุ่น</Text>

        //ช่องกรอกชื่อสถานที่
        <Text>ชื่อสถานที่ (เช่น โตเกียว, เกียวโต, ฟูจิ)</Text>
        <TextInput
          value={placeName}
          onChangeText={setPlaceName}
          style={styles.input}
          placeholder="กรอกชื่อสถานที่"
        />

      //ช่องกรอกงบประมาณ
        <Text>งบประมาณ (บาท)</Text>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          style={styles.input}
          placeholder="เช่น 15000"
          keyboardType="numeric"
        />

      //ปุ่มบันทึก
        <Button title="บันทึกแพลน 🇯🇵" onPress={addTrip} color="#E60026" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F5", // โทนอ่อนแดง
  },
  card: {
    width: 300,
    borderWidth: 1,
    borderColor: "#E60026",
    padding: 20,
    borderRadius: 20,
    gap: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#E60026",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
