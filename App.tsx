import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DeleteButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: "#fad2",
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>✖️</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<{ content: string; key: string }[]>([
    { content: "Todo 1", key: "0" },
    { content: "Todo 2", key: "1" },
    { content: "Todo 3", key: "2" },
    { content: "Todo 4", key: "3" },
    { content: "Todo 5", key: "4" },
    { content: "Todo 6", key: "5" },
    { content: "Todo 7", key: "6" },
    { content: "Todo 8", key: "7" },
    { content: "Todo 9", key: "8" },
    { content: "Todo 10", key: "9" },
    { content: "Todo 11", key: "10" },
    { content: "Todo 12", key: "11" },
    { content: "Todo 13", key: "12" },
    { content: "Todo 14", key: "13" },
    { content: "Todo 15", key: "14" },
    { content: "Todo 16", key: "15" },
    { content: "Todo 17", key: "16" },
    { content: "Todo 18", key: "17" },
    { content: "Todo 19", key: "18" },
  ]);

  const addTodo = useCallback(() => {
    if (!input) return;
    setTodos((todos) => [...todos, { content: input, key: todos.length.toString() }]);
    setInput("");
  }, [input, todos]);

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <TextInput value={input} onChangeText={setInput} placeholder="Add a todo" style={styles.textInput} />
        <Button title="Add" onPress={addTodo} disabled={!input} />
      </View>
      <FlatList
        data={todos}
        style={styles.todoList}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item.key}
        renderItem={({ item: { content, key } }) => (
          <View style={styles.todoItem}>
            <Text>{content}</Text>
            <DeleteButton
              onPress={() => {
                setTodos(todos.filter((todo) => todo.key !== key));
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: StatusBar.currentHeight,
  },
  textInput: {
    marginBottom: 10,
    height: 40,
  },
  todoList: {
    marginVertical: 8,
  },
  todoItem: {
    borderColor: "aliceblue",
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    display: "flex",
    // justifyContent: "center",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
