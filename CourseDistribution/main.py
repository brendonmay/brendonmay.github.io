import csv
import math
from pulp import *
from flask import Flask, request, render_template
from io import StringIO
app = Flask(__name__)

def load_data(file_like_object):
    reader = csv.reader(file_like_object)
    header = next(reader)
    courses = [i for i in range(len(header) - 4)]
    course_names = header[4:]
    teachers_dict = {}
    teachers_names = []
    teacher_preferences = []
    num_courses_per_teacher = {}
    course_period = {}
    prep_preferences = []
    for i, course_name in enumerate(course_names):
        period_string = course_name.split(" (Period ")[1].split(")")[0]
        course_period[courses[i]] = int(period_string)
    for i, row in enumerate(reader):
        if row[1] not in teachers_dict.values():
            teachers_dict[i] = row[1]
            teachers_names.append(row[1])
            num_courses_per_teacher[i] = int(row[2])
            #new code here
            teach_pref = []
            for j in range(4, len(header)):
                if row[j] == 'Not Qualified / Exclusion':
                    teach_pref.append(0)
                else:
                    teach_pref.append(int(row[j]))
            teacher_preferences.append(teach_pref)
            #old code
            #teacher_preferences.append([int(row[j]) for j in range(4, len(header))])
            prep_preferences.append(int(row[3]))
    teachers = [i for i in range(len(teacher_preferences))]
    course_exclusions = {}
    for i, teacher_pref in enumerate(teacher_preferences):
        excluded_courses = []
        for j, preference in enumerate(teacher_pref):
            if preference == 0:
                excluded_courses.append(j)
        if excluded_courses:
            course_exclusions[i] = excluded_courses

    # print("teacher_preferences:", teacher_preferences)
    # print("num_courses_per_teacher:", num_courses_per_teacher)
    # print("course_names:", course_names)
    # print("course_period:", course_period)
    # print("courses: ", courses)
    # print("teachers: ", teachers)
    # print("prep_preferences: ", prep_preferences)
    # print("course_exclusions: ", course_exclusions)
    # print("teachers_dict: ", teachers_dict)
    # print("teachers_names: ", teachers_names)

    # # Test data
    # teacher_preferences = [
    #     [4, 3, 5, 2, 1, 4, 5, 2, 3, 4, 5, 1, 2, 4, 3, 2, 5, 1, 4, 3],
    #     [5, 4, 2, 3, 1, 5, 4, 3, 2, 5, 4, 1, 3, 5, 2, 3, 4, 1, 5, 2],
    #     [3, 5, 2, 4, 1, 3, 5, 4, 2, 3, 5, 1, 4, 3, 5, 4, 2, 1, 3, 5],
    #     [2, 4, 3, 5, 1, 2, 4, 5, 3, 2, 4, 1, 5, 2, 4, 5, 3, 1, 2, 4],
    #     [1, 2, 4, 3, 5, 1, 2, 3, 4, 1, 2, 5, 3, 1, 2, 3, 4, 5, 1, 2],
    #     [5, 3, 2, 4, 1, 5, 3, 4, 2, 5, 3, 1, 4, 5, 3, 4, 2, 1, 5, 3],
    #     [5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5]
    # ]
    # prep_preferences = [5, 5, 5, 5, 5, 5, 5]
    # teachers = [0, 1, 2, 3, 4, 5, 6]
    # courses = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    #         10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    # num_courses_per_teacher = {0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2}
    # course_period = {0: 1, 1: 2, 2: 1, 3: 4, 4: 3, 5: 2, 6: 1, 7: 3, 8: 1, 9: 4,
    #                 10: 3, 11: 2, 12: 1, 13: 2, 14: 1, 15: 4, 16: 4, 17: 2, 18: 3, 19: 3}
    # course_exclusions = {1: [2, 5, 6], 3: [1, 5], 4: [8, 9, 10, 11, 12, 17], 6: [0, 7, 8, 20]}
    # course_names = ["MHF4U1-01", "MHF4U1-02", "MHF4U1-03", "MCR3U1-01", "MCR3U1-02", "MCR3U1-03", "MTH1W1-01", "MTH1W1-02", "MTH1W1-03", "MTH1W1-04",
    #                 "MTH1W1-05", "MTH1W1-06", "MPM2D1-01", "MPM2D1-02", "MPM2D1-03", "MPM2D1-04", "MAP4C1-01", "MCF3M1-01", "MCF3M1-02", "MCV4U-01"]
    # teachers_names = ["May", "Sturino", "Tavares", "Lammers", "Gonsalves", "Higgens", "Tran"]

    # Define the set of periods
    periods = set(course_period.values())

    # Define the LP problem
    prob = LpProblem("Course Assignment Problem", LpMaximize)

    # Define the decision variables
    teacher_vars = LpVariable.dicts("teacher", (teachers, courses), 0, 1, LpBinary)

    # Define the objective function
    def get_same_first_five_letters(courses):
        return [course[:5] for course in courses]

    def num_of_unique_courses(course_names):
        unique_courses = set()

        for course in course_names:
            unique_courses.add(course[:5])

        return len(unique_courses)


    def constraints_satisfied(course_names, teachers_names, teacher_preferences):
        num_unique_courses = num_of_unique_courses(course_names)
        teacher_index = 0
        teacher_violators = {}  # {"May": {"MHF4U", "MCR3U"}}
        teacher_additions = {} # {"May": 2} implies May needs an additional 2 courses rank 3 or higher
        display_violation = False

        while teacher_index < len(teacher_preferences):
            course_ranks = teacher_preferences[teacher_index]
            course_index = 0
            teacher_name = teachers_names[teacher_index]
            teacher_courses = set()
            teacher_exclusions = set()

            while course_index < len(course_ranks):
                course_rank = course_ranks[course_index]
                full_course_name = course_names[course_index]
                course_name = full_course_name[:5]

                if course_rank >= 3:
                    teacher_courses.add(course_name)

                if course_rank == 0:
                    teacher_exclusions.add(course_name)
                course_index += 1

            teacher_spread = len(teacher_courses)
            num_of_exclusions = len(teacher_exclusions)
            spread = math.floor((num_unique_courses - num_of_exclusions) / 2)

            if teacher_spread < spread:
                teacher_violators[teacher_name] = teacher_courses
                difference = spread - teacher_spread
                teacher_additions[teacher_name] = difference
                display_violation = True

            teacher_index += 1
        if display_violation:
            return teacher_violators, teacher_additions
        else:
            return True

    prob += lpSum([teacher_preferences[i][j] * teacher_vars[i][j]
                for i in teachers for j in courses]) + lpSum([prep_preferences[i] * (len([c for c in range(len(courses)) if teacher_vars[i][c].varValue == 1]) == 2 and len(set(get_same_first_five_letters([courses[c] for c in range(len(courses)) if teacher_vars[i][c].varValue == 1]))) == 1)
                for i in teachers]), "Total Teacher Preference and Same First Five Letter Course Count"

    # Add constraints
    # Create a dictionary to track the number of occurrences of each course name for each teacher
    course_name_count = {(i, course_name): lpSum([teacher_vars[i][j] for j in courses if course_names[j] == course_name]) for i in teachers for course_name in set(course_names)}

    # Create a dictionary to track the number of occurrences of each course prefix for each teacher
    course_prefix_count = {(i, course_name[:5]): lpSum([teacher_vars[i][j] for j in courses if course_names[j][:5] == course_name[:5]]) for i in teachers for course_name in set(course_names)}

    # No teacher can be given multiple courses with the same name
    for i in teachers:
        for course_name in set(course_names):
            # Ensure no more than two courses with the same name are assigned to the teacher
            prob += course_name_count[(i, course_name)] <= 2, f"No_Three_Same_Courses_{i}_{course_name}"

    # No teacher can be given multiple courses with the same prefix
    for i in teachers:
        for course_prefix in set(course_name[:5] for course_name in course_names):
            prob += course_prefix_count[(i, course_prefix)] <= 2, f"No_Three_Same_Prefix_Courses_{i}_{course_prefix}"

    # Add constraints to ensure no teacher receives a score lower than specified thresholds
    for i in teachers:
        num_teacher_courses = num_courses_per_teacher[i]
        total_teacher_score = lpSum([teacher_preferences[i][j] * teacher_vars[i][j] for j in courses])

        if num_teacher_courses == 3:
            min_acceptable_score = 11
        elif num_teacher_courses == 2:
            min_acceptable_score = 6
        elif num_teacher_courses == 1:
            min_acceptable_score = 3
        else:
            # Adjust this condition as needed based on your requirements
            min_acceptable_score = 0

        prob += total_teacher_score >= min_acceptable_score, f"Min_Score_for_Teacher_{i}"
        
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

    # Print the solution
    # for i in teachers:
    #     teacher_score = 0
    #     for j in courses:  # determine total teacher preference score for each teacher
    #         if teacher_vars[i][j].varValue == 1.0:
    #             teacher_score += teacher_preferences[i][j]
    #             print(
    #                 f"Teacher {i} assigned to course {course_names[j]} with preference {teacher_preferences[i][j]} and period {course_period[j]}")
    #     print(f"Teacher {i} has a total preference score of {teacher_score}")

    # Retrieve the solution and organize it in a nested dictionary
    solution = {}
    send_error = False
    teacher_violators = {}
    teacher_additions = {}

    if constraints_satisfied(course_names, teachers_names, teacher_preferences) != True:
        teacher_violators, teacher_additions = constraints_satisfied(course_names, teachers_names, teacher_preferences)
        send_error = True

    for i in teachers:
        teacher_score = 0
        solution[teachers_names[i]] = { 'course_names': [], 'teacher_score': 0 }
        for j in courses:
            if teacher_vars[i][j].varValue == 1:
                solution[teachers_names[i]]['course_names'].append(course_names[j])
                teacher_score += teacher_preferences[i][j]
        solution[teachers_names[i]]['teacher_score'] = teacher_score
        
        if len(solution[teachers_names[i]]['course_names']) != 0:
            solution[teachers_names[i]]['average_score'] = round(teacher_score / len(solution[teachers_names[i]]['course_names']), 2)
        else:
            solution[teachers_names[i]]['average_score'] = 0

    num_unique_courses = num_of_unique_courses(course_names)

    return {"solution":solution, "send_error":send_error, "teacher_violators":teacher_violators, "teacher_additions":teacher_additions, "num_unique_courses": num_unique_courses}

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files['file']
        file_data = file.read().decode("utf-8")

        if file:
            file_like_object = StringIO(file_data)
            all_data = load_data(file_like_object)
            solution = all_data["solution"]
            send_error = all_data["send_error"]
            teacher_violators = all_data["teacher_violators"]
            teacher_additions = all_data["teacher_additions"]
            num_unique_courses = all_data["num_unique_courses"]

            if send_error:
                return render_template("error.html", teacher_violators=teacher_violators, teacher_additions=teacher_additions, num_unique_courses=num_unique_courses)

            return render_template("teacher_assignments.html", solution=solution)

    return """
        <html>
    <head>
        <style>
            body {
                background-color: #f2f2f2;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333333;
                font-size: 36px;
                margin-bottom: 5px;
            }
            h2 {
                color: #333333;
                font-size: 12px;
                margin-bottom: 20px;
            }
            p {
                font-size: 18px;
                color: #555555;
                margin-bottom: 30px;
            }
            form {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                margin: auto;
                width: 500px;
            }
            input[type="file"] {
                margin-bottom: 20px;
                padding: 10px;
                font-size: 18px;
                width: 100%;
                border: none;
                border-bottom: 2px solid #dddddd;
            }
            input[type="submit"] {
                background-color: #333333;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                border: none;
                font-size: 18px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>Teacher Course Distributor V4</h1>
        <h2>Last Updated: 12/14/2023</h2>
        <p>This program is designed to consider all teacher preferences for desired courses and will automatically construct a schedule which maximizes overall teacher preference. With the power of mathematics, we can create a schedule that satisfies all department members as much as possible.</p>
        <p>Please download this <a href="https://docs.google.com/forms/d/1KDXckJ5_bVsctTY4rKxEKv4ZI01ZtPOx4xfo-_FikcE/copy" target="_blank">Google Form</a> and have all of your department members fill it out.</p>
        <p>Once all members have completed the form, download the spreadsheet as a .CSV file and upload it below:</p>
        <form action="/" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" value="Upload">
        </form>
</body>

</html>

    """

if __name__ == "__main__":
    app.run(debug=True)
