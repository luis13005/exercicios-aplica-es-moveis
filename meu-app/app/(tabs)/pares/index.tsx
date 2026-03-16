import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, StyleSheet } from "react-native";

function filtrarPares(numeros: number[]): number[] {
  return numeros.filter(num => num % 2 === 0);
}

function formatarResultado(pares: number[], total: number): string {
  return `Números pares: ${pares.join(', ')}\nTotal de pares: ${pares.length} de ${total}`;
}

export default function ParesScreen() {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [focusEntrada, setFocusEntrada] = useState(false);

   useFocusEffect(
    useCallback(() =>{
            limpar();
        },[])
    );


  function limpar() {
    setEntrada('');
    setResultado(null);
  }

  function filtrarpares() {
    if (!entrada.trim()) {
      Alert.alert("Erro", "Digite pelo menos um número");
      return;
    }

    try {
      const numerosStr = entrada
        .split(/[,\s]+/)
        .filter(str => str.trim() !== '');

      if (numerosStr.length === 0) {
        Alert.alert("Erro", "Digite números separados por vírgula ou espaço");
        return;
      }

      const numeros = numerosStr.map(str => {
        const num = parseInt(str.trim(), 10);
        if (isNaN(num)) {
          throw new Error(`"${str}" não é um número válido`);
        }
        return num;
      });

      const pares = filtrarPares(numeros);
      setResultado(formatarResultado(pares, numeros.length));
    } catch (error) {
      Alert.alert("Erro", (error as Error).message);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Filtrar Números Pares</ThemedText>

      <ThemedText style={styles.label}>Números</ThemedText>
      <TextInput
        placeholder="Digite os numeros(Ex: 1, 2, 3, 4, 5, 6)"
        keyboardType="number-pad"
        value={entrada}
        onChangeText={setEntrada}
        style={[styles.input, focusEntrada && styles.inputFocused]}
        onFocus={() => setFocusEntrada(true)}
        onBlur={() => setFocusEntrada(false)}
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity style={styles.botao} onPress={filtrarpares}>
        <ThemedText style={styles.botaoTexto}>Filtrar</ThemedText>
      </TouchableOpacity>

      {resultado && (
        <ThemedView style={styles.resultadoContainer}>
          <ThemedText style={styles.resultadoLabel}>Resultado</ThemedText>
          <ThemedText style={styles.resultadoValor}>{resultado}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
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
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  resultadoLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  resultadoValor: {
    fontSize: 16,
    fontWeight: '500',
  },
});
