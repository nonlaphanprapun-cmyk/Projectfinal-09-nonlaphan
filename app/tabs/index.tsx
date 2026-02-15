import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// สร้าง Type ของข้อมูล
type TripPlan = {
  id: string; //ไว้ระบุรายการ
  place: string;
  budget: string;
};

// State สำหรับเก็บข้อมูลทั้งหมด
export default function Home() {
  const [allTrips, setAllTrips] = useState<TripPlan[]>([]);

  // useEffect โหลดข้อมูลจากเครื่อง
  useEffect(() => {
    loadTrips();
  }, [allTrips]); // โหลดครั้งเดียว

  // ฟังก์ชันโหลดข้อมูล
  async function loadTrips() {
    const data = await AsyncStorage.getItem("japanTrips");
    if (data !== null) {
      setAllTrips(JSON.parse(data));
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗾 แพลนเที่ยวญี่ปุ่นของฉัน</Text>
 
      <FlatList
        data={allTrips}
        keyExtractor={(item) => item.id}

        //แสดงแต่ละรายการ
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.place}>🏯 สถานที่: {item.place}</Text>
            <Text style={styles.budget}>💴 งบประมาณ: {item.budget} บาท</Text>
          </View>

          //ถ้าไม่มีข้อมูลจะแสดงข้อความนี้แทน
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            ยังไม่มีแพลนเที่ยว 🇯🇵
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF5F5", // โทนแดงอ่อน
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#E60026",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E60026",
    elevation: 3,
  },
  place: {
    fontSize: 16,
    fontWeight: "bold",
  },
  budget: {
    marginTop: 5,
  },
});
