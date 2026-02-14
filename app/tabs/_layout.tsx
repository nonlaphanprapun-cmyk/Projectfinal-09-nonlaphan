import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title:"หน้าแรก",
                    tabBarIcon: () => (
                        <Ionicons name="home" size={20} color="pink" />
                    )
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title:"ใส่ข้อมูล",
                    tabBarIcon: () => (
                        <Ionicons name="book" size={20} color="blue" />
                    )
                }}

                
            />

            <Tabs.Screen
                name="delete"
                options={{
                    title:"ลบข้อมูล",
                    tabBarIcon: () => (
                        <Ionicons name="trash" size={20} color="black" />
                    )
                }}

                
            />
        </Tabs>
    )
}