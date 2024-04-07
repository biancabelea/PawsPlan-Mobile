import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase.js';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeredEmail, setRegisteredEmail] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            const userData = {
                ownerName: name,
                email: user.email,
            };
            await setDoc(userRef, userData);

            setRegisteredEmail(email);
            setName('');
            setEmail('');
            setPassword('');
            console.log('Registered as:', email);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter your name"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={true}
            />
            <Button title="REGISTER" onPress={handleRegister} />
            {registeredEmail && (
                <Text>Registered as: {registeredEmail}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        width: 300,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default Register;
