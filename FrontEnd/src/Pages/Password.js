import './Password.css'

function Password(){
    return(
        <div>
        
            <div className='pass12'>
                <label className='change'><h2>Change Password</h2></label>
            </div>
            <div className='box301'>
                <input className='p1' placeholder='current password'></input> <br></br>
                <input className='p2' placeholder='new password'></input>
                <input className='p3' placeholder='confirm password'></input>
            </div><br />
            <button className='abcd'>Submit</button>
        </div>

    );
}
export default Password;