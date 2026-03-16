import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function maioridadeScreen(){
    const [idade, setIdade] = useState<number | null>(null)
    const [resultado, setResultado] = useState<string | null>(null)
    const [focusIdade, setFocusIdade] = useState(false)

    useFocusEffect(
      useCallback(() => {
        limpar();
      }, [])
    );

    function limpar() {
      setIdade(null);
      setResultado(null);
    }

    function ValidarMaioridade(){

        if(!idade){
            Alert.alert("Digite a idade.")
            return;
        }
        
        if(idade >= 18){
            setResultado("Maior de idade")
            return;
        }

        setResultado("Menor de idade")
    }

    return(
        <ThemedView style={styles.container}>
            <ThemedText style={styles.titulo}>Validador de Maioridade</ThemedText>

            <TextInput style={[styles.input, focusIdade && styles.inputFocused ]}
            placeholder="Digite a idade"
            value={idade !== null ? idade.toString() : ''}
            onChangeText={input =>{setIdade(input ? parseInt(input,10) : null)}}
            onFocus={() => setFocusIdade(true)}
            onBlur={() => setFocusIdade(false)}>
            </TextInput>

            <TouchableOpacity style={styles.botao} onPress={ValidarMaioridade}>
                 <ThemedText style={styles.botaoTexto}>Verificar</ThemedText>
            </TouchableOpacity>

            {resultado && (
                        <ThemedView style={styles.resultadoContainer}>
                            <ThemedText style={styles.resultadoLabel}>Resultado</ThemedText>
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