import React, {useState } from 'react';
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"



const PDFViewer = () => {	
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState(null);

	const onloadFile = async (e) => {
		e.preventDefault();
		const storage = getStorage();
		console.log(storage);
		const storageRef = collection(db, "newsletters");	
   		console.log(storageRef);

		   getDocs(storageRef)
		   .then((resp) => {
			 const newsletter = resp.docs.map((doc) => {
			   return { ...doc.data(), id: doc.id }
			 })
			 console.log(newsletter)
		   })
   

		
		
	}

	return (
		<div className='container-fluid bg-dark'>
		<div className='container'>
			<form onSubmit={onloadFile}>
				<h2>Upload PDF</h2>
				<label>Title</label>
				<input type='text' className='form-control'  placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
				<input type='file'  className='form-control' accept='application/pdf' onChange={(e)=> setFile(e.target.files[0])}/>
				<button type='submit' className='btn btn-success' >Upload PDF</button>			
			</form>
			<h2>Upload PDF</h2>			
			</div>
		</div>
	
	);
};



  export default PDFViewer;
