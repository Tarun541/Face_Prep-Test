import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import '../index.css'

import photo from '../photo.jpeg'



const Home = () => {


    const navigate = useNavigate()

    const [dataSource, setDataSource] = useState([])
    const [hasMore, setHasMore] = useState(true);




    useEffect(() => {
        if (!localStorage.getItem('dataKey'))
            navigate('/')
        fff();
    }, [])

    const fff = async () => {
        fetch('https://randomuser.me/api/?results=20')
            .then(async (response) => {
                const data = await response.json()
                console.log(data.results);
                let arr = data.results;
                setDataSource(arr);
                console.log(dataSource)
                setHasMore(true);
            }).catch((err) => {
                console.log(err)
            })
    }

    const fetchMoreData = () => {
        if (dataSource.length <= 150) {
            setTimeout(() => {
                fetch('https://randomuser.me/api/?results=20')
                    .then(async (response) => {
                        const data = await response.json()
                        console.log(data.results);
                        let arr = dataSource.concat(data.results)
                        setDataSource(arr);
                        console.log(dataSource)
                    }).catch((err) => {
                        console.log(err)
                    })
            }, 1000)

            setHasMore(true);
        }
        else {
            setHasMore(false)
        }

    }

    const handlelogout = () => {
        localStorage.removeItem('dataKey');
        console.log("in logout function")
        navigate('/')
    }


    if (dataSource.length == 0) {
        return (
            <Loading />
        )
    }
    else {
        return (

            <div >
                <div className='border border-secondary'>
                    <div className='buttons mx-2 mt-3'>
                        <button type="button" class="btn btn-primary" onClick={() => handlelogout()}>Logout</button>
                    </div>
                </div>
                <div>
                    <h3 className='text-center mt-5'>List of Users</h3>
                </div>
                <div className='user-data'>
                    <InfiniteScroll
                        dataLength={dataSource.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        loader={<p className='text-center'>Loading...</p>}
                        endMessage={<p className='text-center'>End of Users</p>}
                    >
                        {dataSource.map((user, index) => {
                            return (
                                <div className='user' key={index}>
                                    <img src={user.picture.medium} className="image" alt="" />
                                    <span className="username">{user.name.first} {user.name.last} </span>
                                </div>
                            )
                        })}
                    </InfiniteScroll>

                </div>
            </div>
        )
    }
}

export default Home

