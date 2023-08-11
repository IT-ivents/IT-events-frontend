import Organization from '../components/Organization/Organization';

const CreateNewEventPage = () => {
  return <Organization />;
};

// const createNewEvent = async (data) => {
//     const res = await apiEvents.postNewEvent(data)
//     const newEvent = await res.json();
//     return newEvent
// }

// const createNewEventAction = async ({ request }) => {
//  const formData = await request.formData()
//  console.log(formData)
//  const event = await createNewEvent(formData)

//  return redirect('/account/events')
// }

export default CreateNewEventPage;
