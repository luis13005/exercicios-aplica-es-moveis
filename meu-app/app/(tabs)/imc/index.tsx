import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ImcScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [classificacao, setClassificacao] = useState<string | null>(null);
  const [focusPeso, setFocusPeso] = useState(false);
  const [focusAltura, setFocusAltura] = useState(false);

  function calcularIMC() {
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));

    if (!p || !a || a <= 0) {
      setResultado('Preencha os campos corretamente');
      setClassificacao(null);
      return;
    }

    const imc = p / (a * a);
    setResultado(imc.toFixed(2));

    if (imc < 18.5)        setClassificacao('Abaixo do peso');
    else if (imc < 25)     setClassificacao('Peso normal');
    else if (imc < 30)     setClassificacao('Sobrepeso');
    else if (imc < 35)     setClassificacao('Obesidade grau I');
    else if (imc < 40)     setClassificacao('Obesidade grau II');
    else                   setClassificacao('Obesidade grau III');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Calculadora de IMC</ThemedText>

      <ThemedText style={styles.label}>Peso (kg)</ThemedText>
      <TextInput
        placeholder="Ex: 70.5"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        style={[styles.input, focusPeso && styles.inputFocused]}
        onFocus={() => setFocusPeso(true)}
        onBlur={() => setFocusPeso(false)}
        underlineColorAndroid="transparent"
      />

      <ThemedText style={styles.label}>Altura (m)</ThemedText>
      <TextInput
        placeholder="Ex: 1.75"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
        style={[styles.input, focusAltura && styles.inputFocused]}
        onFocus={() => setFocusAltura(true)}
        onBlur={() => setFocusAltura(false)}
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <ThemedText style={styles.botaoTexto}>Calcular</ThemedText>
      </TouchableOpacity>

      {resultado && (
        <ThemedView style={styles.resultadoContainer}>
          <ThemedText style={styles.resultadoLabel}>Seu IMC</ThemedText>
          <ThemedText style={styles.resultadoValor}>{resultado}</ThemedText>
          {classificacao && (
            <ThemedText style={styles.classificacao}>{classificacao}</ThemedText>
          )}
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