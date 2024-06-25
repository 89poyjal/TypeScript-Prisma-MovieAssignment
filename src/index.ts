

import readlineSync from 'readline-sync';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


 
async function addMovie() {
try {
    const title: string = readlineSync.question("enter title: ");
    const year: number = readlineSync.questionInt("enter year: ");

    const newMovie = await prisma.movie.create({
        
        data: {
            title,
            year,
        },
    })
    console.log(newMovie);
    
} catch (error){
    console.error('Error adding movie:', error)
    throw error
}

}

  // UpdateMovie

async function updateMovie(){
    try {
        const movieId: string = readlineSync.question("enter Id: ");
    
        const title: string = readlineSync.question("enter title: ");
        const year: number = readlineSync.questionInt("enter year: ");
        const genreId: string = readlineSync.question("enter genre: ");
        const updatedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: {
                title,
                year,
                genreId
            }
        })
        return updatedMovie
    } catch (error) {
        console.error('Error updating movie:', error)
        throw error 

    } 
}



async function deleteMovie() {
    const titleId: string = readlineSync.question("enter title");
   const result = await prisma.movie.delete({
    where: {id: titleId}
   })
   console.log(result);
   
}


async function listMovies() {
    const result = await prisma.movie.findMany({
    include: {
            genre: true
        }
    });
    result.forEach(movie => {
        movie.genre.forEach(genre => {
            console.log(genre.name)
        });
    });
}



async function listMovieById() {
    const listMovieById: string = readlineSync.question("enter Id");
    const result = await prisma.movie.findMany({
        include: {
            genre: true
        }
    });
    result.forEach(genre => {
        console.log(genre.id)
        
    });

    
    

   
    // Expected:
    // 1. Prompt the user for movie ID to list.
    // 2. Use Prisma client to fetch the movie with the provided ID.
    //    Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique
    // 3. Include the genre details in the fetched movie.
    // 4. Print the movie details with its genre.
}

async function listMoviesByYear() {
    const year: number = readlineSync.questionInt("enter year: ");
    const result = await prisma.movie.findMany({
        where: {
            year: year,
        },
        include: {
            genre: true
        }
    });
    result.forEach(movie => {
        console.log(movie.title)
        movie.genre.forEach(genre => {
            console.log(genre.name)
        });
        

    });
    
   
    // Expected:
    // 1. Prompt the user for the year to list movies.
    // 2. Use Prisma client to fetch movies from the provided year.
    //    Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
    // 3. Include the genre details in the fetched movies.
    // 4. Print the list of movies from that year with their genres.
}

async function listMoviesByGenre() {
    const genreId: string = readlineSync.question("enter genre: ");
    const result = await prisma.genre.findMany({
        include: {
            Movie: true
        }
    });
    result.forEach(genre =>{
        console.log(genre.name)
    });



    // Expected:
    // 1. Prompt the user for genre Name to list movies.
    // 2. Use Prisma client to fetch movies with the provided genre ID.
    //    Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
    // 3. Include the genre details in the fetched movies.
    // 4. Print the list of movies with the provided genre.
}

async function addGenre() {
    try {
        const name: string = readlineSync.question("enter name: ");
    
        const newGenre = await prisma.genre.create({
            
            data: {

                name
            },
        })
        console.log(newGenre);
   
    }
    catch (error){
    console.error('Error adding movie:', error)
    throw error

    // Expected:
    // 1. Prompt the user for genre name.
    // 2. Use Prisma client to create a new genre with the provided name.
    //    Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
    // 3. Print the created genre details.
}
}
async function addGenreToMovie() {
    const genres: string = readlineSync.question("entre multiple genres to add (comma separated)");
    const nygerenelist=genres.split(',');
    for (let i = 0; i < nygerenelist.length; i++) {
        await prisma.genre.create({
            data:{
                name: nygerenelist[i]
            }
        
        })
        
    }
    console.log(nygerenelist)

    // Expected:
    // 1. Prompt the user for multiple genres to add (comma separated).
    // 2. Split the input into an array of genre names.
    // 3. Use Prisma client to create multiple genres with the provided names.
    //    Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
    // 4. Print the created genres details.
}

async function main() {
    let exit = false;

    while (!exit) {
        console.log("\n--- Movie Management System ---");
        console.log("1. Add Movie");
        console.log("2. Update Movie");
        console.log("3. Delete Movie");
        console.log("4. List All Movies");
        console.log("5. List Movie by ID");
        console.log("6. List Movies by Year");
        console.log("7. List Movies by Genre");
        console.log("8. Add Genre");
        console.log("9. Add Genre to Movie");
        console.log("0. Exit");

        const choice: number = readlineSync.questionInt('Enter your choice: ');

        switch (choice) {
            case 1:
                await addMovie();
                break;
            case 2:
                await updateMovie();
                break;
            case 3:
                await deleteMovie();
                break;
            case 4:
                await listMovies();
                break;
            case 5:
                await listMovieById();
                break;
            case 6:
                await listMoviesByYear();
                break;
            case 7:
                await listMoviesByGenre();
                break;
            case 8:
                await addGenre();
                break;
            case 9:
                await addGenreToMovie();
                break;
            case 0:
                exit = true;
                break;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });