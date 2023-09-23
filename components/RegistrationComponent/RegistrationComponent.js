import {Text, StyleSheet, View, SafeAreaView, TextInput, Button} from 'react-native';
import {useState} from "react";
import { SelectList } from 'react-native-dropdown-select-list'

const dummyData = [
    {key:'1', value:'Mobiles'},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers'},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]
const RegistrationComponent = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selected, setSelected] = useState("");


    const registrationHandle = () => {
        console.log("click");

        console.log(selected);
    };

    const validateForm = () => {
      return (username.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0)
    };

    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
                <SafeAreaView>
                    <Text>Firstname:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your firstname"}
                        onChangeText={setFirstname}
                    />

                    <Text>Lastname:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your Lastname"}
                        onChangeText={setLastname}
                    />

                    <Text>Username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your Username"}
                        onChangeText={setUsername}
                    />

                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your password"}
                        onChangeText={setPassword}
                    />

                    <View
                        style={{
                            marginTop: 10
                        }}
                    >
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={dummyData}
                            save="key"
                        />
                    </View>


                    <View style={{margin: 10}}>
                        <Button
                            title={"Registration"}
                            onPress={registrationHandle}
                            disabled={validateForm()}
                        />
                    </View>
                </SafeAreaView>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        //width: '100%',
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default RegistrationComponent;
