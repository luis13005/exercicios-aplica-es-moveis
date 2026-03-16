import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function NameFormatScreen() {
 const [nome,setNome] = useState('')
 const [focusNome,setFocusNome] = useState(false)
 const [sobreNome, setSobrenome] = useState('')
 const [focusSobreNome,setFocusSobreNome] = useState(false)
 const [resultado, setResultado] = useState<string | null>(null);
 
 useFocusEffect(
   useCallback(() => {
     limpar();
   }, [])
 );

 function limpar() {
   setNome('');
   setSobrenome('');
   setResultado(null);
 }

function formatNome(){
    console.log('Nome digitado:', nome);
    console.log('Nome vazio?:', !nome || nome.trim() === '');
    
    if(!nome || nome.trim() === ''){
        Alert.alert("Erro", "Por favor, escreva o seu nome");
        return;
    }

    setResultado(nome.trim() +' '+sobreNome?.trim());
}

 return(
     
    <ThemedView style={styles.container}>
        <ThemedText style={styles.titulo}>Formatar Nome</ThemedText>

        <TextInput  style={[styles.input, focusNome && styles.inputFocused]}
            placeholder="Digite o nome"
            onFocus={() => setFocusNome(true)}
            onBlur={() => setFocusNome(false)}
            onChangeText={setNome}>
        </TextInput>

        <TextInput  style={[styles.input, focusSobreNome && styles.inputFocused]}
            placeholder="Digite o sobrenome"
            onFocus={() => setFocusSobreNome(true)}
            onBlur={() => setFocusSobreNome(false)}
            onChangeText={setSobrenome}>
        </TextInput>

        <TouchableOpacity style={styles.botao} onPress={formatNome}>
            <ThemedText style={styles.botaoTexto}>Formatar</ThemedText>
        </TouchableOpacity>

        {resultado && (
            <ThemedView style={styles.resultadoContainer}>
                <ThemedText style={styles.resultadoLabel}>Nome</ThemedText>
                <ThemedText style={styles.resultadoValor}>{resultado}</ThemedText>
            </ThemedView>
        )}
    </ThemedView>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.7,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
    outlineStyle: 'none',
  } as any,
  inputFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultadoContainer: {
    marginTop: 32,
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultadoLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  resultadoValor: {
    fontSize: 48,
    fontWeight: '700',
  },
  classificacao: {
    marginTop: 8,
    fontSize: 18,
    opacity: 0.8,
  },
});