/**
 * Simple Todo Application Example
 * 
 * This example demonstrates a basic CRUD application built with Copilot.
 * Shows how to structure a simple application with state management.
 */

class TodoApp {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  // Add a new todo item
  addTodo(title, description = '') {
    if (!title || title.trim() === '') {
      throw new Error('Todo title cannot be empty');
    }

    const todo = {
      id: this.nextId++,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.push(todo);
    return todo;
  }

  // Get all todos
  getAllTodos() {
    return [...this.todos];
  }

  // Get a single todo by ID
  getTodoById(id) {
    return this.todos.find(todo => todo.id === id);
  }

  // Update a todo
  updateTodo(id, updates) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    if (updates.title !== undefined) {
      todo.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      todo.description = updates.description.trim();
    }
    if (updates.completed !== undefined) {
      todo.completed = Boolean(updates.completed);
    }

    todo.updatedAt = new Date();
    return todo;
  }

  // Delete a todo
  deleteTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const deleted = this.todos.splice(index, 1)[0];
    return deleted;
  }

  // Mark todo as completed
  completeTodo(id) {
    return this.updateTodo(id, { completed: true });
  }

  // Mark todo as incomplete
  uncompleteTodo(id) {
    return this.updateTodo(id, { completed: false });
  }

  // Get completed todos
  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  // Get pending todos
  getPendingTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  // Search todos by title
  searchTodos(query) {
    const lowerQuery = query.toLowerCase();
    return this.todos.filter(todo => 
      todo.title.toLowerCase().includes(lowerQuery) ||
      todo.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Clear all completed todos
  clearCompleted() {
    const completed = this.getCompletedTodos();
    this.todos = this.getPendingTodos();
    return completed;
  }

  // Get statistics
  getStats() {
    return {
      total: this.todos.length,
      completed: this.getCompletedTodos().length,
      pending: this.getPendingTodos().length,
      completionRate: this.todos.length > 0 
        ? (this.getCompletedTodos().length / this.todos.length * 100).toFixed(2) + '%'
        : '0%'
    };
  }
}

// Example usage
console.log("Todo App Example:\n");

const app = new TodoApp();

// Add some todos
console.log("Adding todos...");
app.addTodo("Learn GitHub Copilot", "Complete all exercises");
app.addTodo("Build a project", "Apply Copilot skills to real project");
app.addTodo("Share knowledge", "Teach others about Copilot");

console.log("All todos:", app.getAllTodos());

// Complete a todo
console.log("\nCompleting first todo...");
app.completeTodo(1);

// Get statistics
console.log("\nTodo statistics:", app.getStats());

// Search todos
console.log("\nSearching for 'Copilot':", app.searchTodos("Copilot"));

// Export the class
module.exports = TodoApp;
