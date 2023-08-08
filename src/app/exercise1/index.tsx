interface ExerciseOneProps {
  onGoBack: () => void
}

const ExerciseOne = ({ onGoBack }: ExerciseOneProps) => (
  <>
    <div className="w-full sm:w-11/12 md:w-9/12 flex flex-col items-center shadow-md sm:rounded-lg p-5 overflow-y-auto" style={{ height: 'calc(90vh - 5rem)' }}>
      <label className="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2">
        How did you discover that you liked software programming, and what was your first program?
      </label>
      <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2 text-justify">
        <p>When I was a child I liked to play with different little things trying to automate circuits with those toys, like water channels with little things that pretended to be boats, or glass marbles in ramps and tunnels, also with toy cars. At the time I did not suspect it but now I think I enjoyed creating some kind of little systems, I enjoyed seeing these things working on their own, at least for a few minutes.</p>
        <p>Then, as a teenager, I learned to program in a lab or school (in my hometown) founded by an engineer I admired. I realized that it was amazing to automate things, processes, save time and see things work themselves.</p>
        <p>My first programs were: a small application that allowed the user to enter data and returned a table filled with this data (the output was printed on the black screen of MS-DOS, table built with ASCII characters), and also a simple graphical animation of a ball that moved from left to right and vice versa. Both coded in qbasic language.</p>
      </label>
      <label className="block uppercase tracking-wide text-black-700 text-xs font-bold mt-2 mb-2 text-justify">
        <p>Describe your typical working day: how do you organize yourself? What tools do you use?</p>
      </label>
      <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2 text-justify">
        <p>My work day depends on the project I work on. Nowadays I have a daily meeting 3 days a week, a spring planning meeting once at the beginning of the scprint and retro meetings (but not frequently). I find the agile methodology very useful for our work. Daily meetings, sizings, plannings, refinement meetings, retro meetings and demos are important in my opinion.</p>
        <p>To organize my work, and that of the team, I use tools like Jira (or Trello in personal projects) for tracking tasks and the project in general, github, CI/CD tools and also shared documentation tools like Confluence.</p>
        <p>I also support my work on communication tools such as chat applications (with groups and channels), email, and, very importantly, video conferencing tools for face-to-face meetings.</p>
      </label>
    </div>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
      onClick={onGoBack}
    >
      {'< Back'}
    </button>
  </>
)

export default ExerciseOne
