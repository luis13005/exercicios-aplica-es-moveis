import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
}

function formatarProduto(produto: Produto): string {
  let resultado = `ID: ${produto.id}\nNome: ${produto.nome}\nPreço: R$ ${produto.preco.toFixed(2)}`;
  
  if (produto.descricao) {
    resultado += `\nDescrição: ${produto.descricao}`;
  }
  
  return resultado;
}

export default function ProdutoScreen() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [focusId, setFocusId] = useState(false);
  const [focusNome, setFocusNome] = useState(false);
  const [focusPreco, setFocusPreco] = useState(false);
  const [focusDescricao, setFocusDescricao] = useState(false);

  useFocusEffect(
    useCallback(() => {
      limpar();
    }, [])
  );

  function limpar() {
    setId('');
    setNome('');
    setPreco('');
    setDescricao('');
    setResultado(null);
  }

  function formatarProdutoHandler() {
    if (!id.trim() || !nome.trim() || !preco.trim()) {
      Alert.alert("Erro", "ID, Nome e Preço são obrigatórios");
      return;
    }

    const produtoId = parseInt(id, 10);
    const produtoPreco = parseFloat(preco.replace(',', '.'));

    if (isNaN(produtoId) || isNaN(produtoPreco)) {
      Alert.alert("Erro", "ID e Preço devem ser números");
      return;
    }

    const produto: Produto = {
      id: produtoId,
      nome: nome.trim(),
      preco: produtoPreco,
      descricao: descricao.trim() || undefined,
    };

    setResultado(formatarProduto(produto));
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Formatar Produto</ThemedText>

      <ThemedText style={styles.label}>ID</ThemedText>
      <TextInput
        placeholder="Digite o identificador do produto"
        keyboardType="number-pad"
        value={id}
        onChangeText={setId}
        style={[styles.input, focusId && styles.inputFocused]}
        onFocus={() => setFocusId(true)}
        onBlur={() => setFocusId(false)}
        underlineColorAndroid="transparent"
      />

      <ThemedText style={styles.label}>Nome</ThemedText>
      <TextInput
        placeholder="Ex: Digite o nome do produto"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, focusNome && styles.inputFocused]}
        onFocus={() => setFocusNome(true)}
        onBlur={() => setFocusNome(false)}
        underlineColorAndroid="transparent"
      />

      <ThemedText style={styles.label}>Preço (R$)</ThemedText>
      <TextInput
        placeholder="Digite o preço"
        keyboardType="decimal-pad"
        value={preco}
        onChangeText={setPreco}
        style={[styles.input, focusPreco && styles.inputFocused]}
        onFocus={() => setFocusPreco(true)}
        onBlur={() => setFocusPreco(false)}
        underlineColorAndroid="transparent"
      />

      <ThemedText style={styles.label}>Descrição (opcional)</ThemedText>
      <TextInput
        placeholder="Digite a descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, focusDescricao && styles.inputFocused]}
        onFocus={() => setFocusDescricao(true)}
        onBlur={() => setFocusDescricao(false)}
        underlineColorAndroid="transparent"
        multiline
      />

      <TouchableOpacity style={styles.botao} onPress={formatarProdutoHandler}>
        <ThemedText style={styles.botaoTexto}>Formatar Produto</ThemedText>
      </TouchableOpacity>

      {resultado && (
        <ThemedView style={styles.resultadoContainer}>
          <ThemedText style={styles.resultadoLabel}>Produto Formatado</ThemedText>
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
