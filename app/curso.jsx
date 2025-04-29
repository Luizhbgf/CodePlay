import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';

const courses = [
  { title: 'Java', description: 'Aprenda POO, estruturas de controle e mais.', color: '#FFB74D' },
  { title: 'Python', description: 'Ideal para iniciantes e ciência de dados.', color: '#81C784' },
  { title: 'C++', description: 'Domine a lógica e memória com eficiência.', color: '#64B5F6' },
];

export default function CursoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Cursos Disponíveis" />
      <View style={styles.content}>
        {courses.map((course, index) => (
          <CourseCard key={index} title={course.title} description={course.description} color={course.color} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { padding: 20 },
});
