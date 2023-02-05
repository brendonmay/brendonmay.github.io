from pulp import *
import csv

def load_data(file):
    with open(file) as f:
        reader = csv.reader(f)
        header = next(reader)
        courses = [i for i in range(len(header) - 4)]
        course_names = header[4:]
        teachers_dict = {}
        teachers_names = []
        teacher_preferences = []
        num_courses_per_teacher = {}
        course_period = {}
        prep_preferences = []
        for i, row in enumerate(reader):
            if row[1] not in teachers_dict.values():
                teachers_dict[i] = row[1]
                teachers_names.append(row[1])
                num_courses_per_teacher[i] = int(row[2])
                teacher_preferences.append([int(row[j]) for j in range(4, len(header))])
                prep_preferences.append(int(row[3]))
                if i+4 < len(header):
                    period_string = header[i + 4].split(" (Period ")[1].split(")")[0]
                    course_period[courses[i]] = int(period_string)
        teachers = [i for i in range(len(teacher_preferences))]
        course_exclusions = {}
        for i, teacher_pref in enumerate(teacher_preferences):
            excluded_courses = []
            for j, preference in enumerate(teacher_pref):
                if preference == 0:
                    excluded_courses.append(j)
            if excluded_courses:
                course_exclusions[i] = excluded_courses

    return teachers_names, course_exclusions, teachers_dict, teacher_preferences, num_courses_per_teacher, course_names, course_period, courses, teachers, prep_preferences

teachers_names, course_exclusions, teachers_dict, teacher_preferences, num_courses_per_teacher, course_names, course_period, courses, teachers, prep_preferences = load_data('spreadsheet.csv')

print("teacher_preferences:", teacher_preferences)
print("num_courses_per_teacher:", num_courses_per_teacher)
print("course_names:", course_names)
print("course_period:", course_period)
print("courses: ", courses)
print("teachers: ", teachers)
print("prep_preferences: ", prep_preferences)
print("course_exclusions: ", course_exclusions)
print("teachers_dict: ", teachers_dict)
print("teachers_names: ", teachers_names)

# Test data
teacher_preferences = [
    [4, 3, 5, 2, 1, 4, 5, 2, 3, 4, 5, 1, 2, 4, 3, 2, 5, 1, 4, 3],
    [5, 4, 2, 3, 1, 5, 4, 3, 2, 5, 4, 1, 3, 5, 2, 3, 4, 1, 5, 2],
    [3, 5, 2, 4, 1, 3, 5, 4, 2, 3, 5, 1, 4, 3, 5, 4, 2, 1, 3, 5],
    [2, 4, 3, 5, 1, 2, 4, 5, 3, 2, 4, 1, 5, 2, 4, 5, 3, 1, 2, 4],
    [1, 2, 4, 3, 5, 1, 2, 3, 4, 1, 2, 5, 3, 1, 2, 3, 4, 5, 1, 2],
    [5, 3, 2, 4, 1, 5, 3, 4, 2, 5, 3, 1, 4, 5, 3, 4, 2, 1, 5, 3],
    [4, 2, 5, 3, 1, 4, 2, 3, 5, 4, 2, 1, 3, 4, 2, 3, 5, 1, 4, 2]
]
prep_preferences = [5, 5, 5, 5, 5, 5, 5]
teachers = [0, 1, 2, 3, 4, 5, 6]
courses = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
           10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
num_courses_per_teacher = {0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2}
course_period = {0: 1, 1: 2, 2: 1, 3: 4, 4: 3, 5: 2, 6: 1, 7: 3, 8: 1, 9: 4,
                 10: 3, 11: 2, 12: 1, 13: 2, 14: 1, 15: 4, 16: 4, 17: 2, 18: 3, 19: 3}
course_exclusions = {1: [2, 5, 6], 3: [1, 5], 4: [8, 9, 10, 11, 12, 17], 6: [0, 7, 8, 20]}
course_names = ["MHF4U1-01", "MHF4U1-02", "MHF4U1-03", "MCR3U1-01", "MCR3U1-02", "MCR3U1-03", "MTH1W1-01", "MTH1W1-02", "MTH1W1-03", "MTH1W1-04",
                "MTH1W1-05", "MTH1W1-06", "MPM2D1-01", "MPM2D1-02", "MPM2D1-03", "MPM2D1-04", "MAP4C1-01", "MCF3M1-01", "MCF3M1-02", "MCV4U-01"]
teachers_names = ["May", "Sturino", "Tavares", "Lammers", "Gonsalves", "Higgens", "Tran"]

# Define the set of periods
periods = set(course_period.values())

# Define the LP problem
prob = LpProblem("Course Assignment Problem", LpMaximize)

# Define the decision variables
teacher_vars = LpVariable.dicts("teacher", (teachers, courses), 0, 1, LpBinary)

# Define the objective function
def get_same_first_five_letters(courses):
    return [course[:5] for course in courses]

prob += lpSum([teacher_preferences[i][j] * teacher_vars[i][j]
              for i in teachers for j in courses]) + lpSum([prep_preferences[i] * (len([c for c in range(len(courses)) if teacher_vars[i][c].varValue == 1]) == 2 and len(set(get_same_first_five_letters([courses[c] for c in range(len(courses)) if teacher_vars[i][c].varValue == 1]))) == 1) 
               for i in teachers]), "Total Teacher Preference and Same First Five Letter Course Count"

# Add constraints
# Maximize fairness
# mean = sum(teacher_preferences[i][j] * teacher_vars[i][j] for i in teachers for j in courses) / len(teachers)
# delta = 0.1 * mean
# for i in teachers:
#     prob += lpSum([teacher_preferences[i][j] * teacher_vars[i][j] for j in courses]) >= mean - delta, f"Fairness_Lower_{i}"
#     prob += lpSum([teacher_preferences[i][j] * teacher_vars[i][j] for j in courses]) <= mean + delta, f"Fairness_Upper_{i}"

# Teachers are excluded from particular courses
for i in teachers:
    for j in courses:
        if j in course_exclusions.get(i, []):
            prob += teacher_vars[i][j] == 0, f"Exclude_{i}_from_{j}"

# No course can be assigned to more than 1 teacher
for j in courses:
    prob += lpSum([teacher_vars[i][j] for i in teachers]
                  ) <= 1, f"One_Teacher_per_Course_{j}"

# Each teacher must be assigned a pre-determined number of courses
for i in teachers:
    prob += lpSum([teacher_vars[i][j] for j in courses]
                  ) == num_courses_per_teacher[i], f"Num_Courses_per_Teacher_{i}"

# No teacher can be given multiple courses from the same period
for p in periods:
    for i in teachers:
        prob += lpSum([teacher_vars[i][j] for j in courses if course_period[j]
                      == p]) <= 1, f"One_Course_per_Period_{i}_{p}"

# Solve the LP problem
prob.solve()

# Retrieve the solution and organize it in a nested dictionary
solution = {}
for i in teachers:
    solution[teachers_names[i]] = []
    for j in courses:
        if teacher_vars[i][j].varValue == 1:
            solution[teachers_names[i]].append(course_names[j])

print(solution)

# Print the solution
for i in teachers:
    teacher_score = 0
    for j in courses:  # determine total teacher preference score for each teacher
        if teacher_vars[i][j].varValue == 1.0:
            teacher_score += teacher_preferences[i][j]
            print(
                f"Teacher {i} assigned to course {course_names[j]} with preference {teacher_preferences[i][j]} and period {course_period[j]}")
    print(f"Teacher {i} has a total preference score of {teacher_score}")
# Print the total teacher preference
print(f"\nTotal Teacher Preference: {value(prob.objective)}")