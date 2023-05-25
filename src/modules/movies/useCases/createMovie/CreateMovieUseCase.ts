import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateMovieUseCase {
    async execute({ title, duration, release_date}: CreateMovieDTO) : Promise<Movie>{
        //verificar se filme ja existe
       const movieAlreadyExist = await prisma.movie.findUnique({
        where: {
            title
        }
       }) 
    
       if (movieAlreadyExist){
        //erro
        throw new AppError("Movie already exist!")
       }


        //criar o filme
        const movie = await prisma.movie.create({
            data: {
                title,
                duration,
                release_date
            }
        })
        return movie;
    }
}