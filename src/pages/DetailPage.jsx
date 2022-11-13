import React from "react";
import styled from "styled-components";
// Components
import HomeLayout from "../layouts/HomeLayout";
import Badge from "../component/Badge";
import InfoDetail from "../component/InfoDetail";
import { RandomPosts } from "./modules/Home";
import SectionHeader from "../component/SectionHeader";

const StyledDetailPage = styled.div`
  .post-info {
    display: flex;
  }
  .post-info__img {
    width: 50%;
    height: 466px;
    object-fit: cover;
    border-radius: 40px;
  }
  .post-info__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 50%;
    padding: 32px;
  }
  .post-info__title {
    padding: 16px 0;

    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 48px;

    color: ${(props) => props.theme.secondary};
  }
  .post-info__meta {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    .view {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
  .post-content {
    width: 100%;
    max-width: 860px;
    margin: 40px auto;
  }
  .post-content__title {
    margin-bottom: 20px;

    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
  }
  .post-content__section {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.005em;
  }
  .post-content__img {
    width: 100%;
    border-radius: 20px;
  }
  .post-content__img-name {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    text-align: center;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: #6b6b6b;
  }

  .author {
    width: 100%;
    display: flex;
    margin: 40px 0;
    background: #f8f9fa;
    border-radius: 20px;
    overflow: hidden;
    img {
      flex-shrink: 0;
      width: 240px;
      height: 240px;
      border-radius: 20px;
      object-fit: cover;
    }
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      padding: 32px;
      h1 {
        padding-bottom: 20px;

        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;

const DetailPage = () => {
  return (
    <HomeLayout>
      <StyledDetailPage>
        <div className="post-info">
          <img
            src="https://images.unsplash.com/photo-1664574654578-d5a6a4f447bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="post-info__img"
          />
          <div className="post-info__content">
            <Badge to="/category/kien-thuc" bg="#F3EDFF">
              Kiến thức
            </Badge>
            <p className="post-info__title">
              Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
            </p>
            <div className="post-info__meta">
              <InfoDetail color="#6B6B6B" style={{ width: 160 }}></InfoDetail>
              <div className="view">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="num">123</span>
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <h1 className="post-content__title">Chương 1</h1>
          <p className="post-content__section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            facilis nulla ullam ab ipsa fuga, harum tempore magnam iste illum
            labore quae nisi quas quibusdam quam sapiente deserunt eius suscipit
            provident animi! Ex harum excepturi sapiente natus, illum beatae
            perspiciatis fugiat quis quisquam tempora impedit, dicta nisi
            dolorum eveniet. Enim, labore ut maiores in rem tempore a.
            Inventore, nisi? Facilis perferendis quae possimus corrupti sapiente
            nihil nobis, atque ducimus. Illum quibusdam maiores deserunt vero
            ratione quos animi esse! Cupiditate, eveniet officia quod ea
            repellat iusto facere in ad, esse eos ducimus possimus nisi nihil
            animi! Quae maiores impedit mollitia officiis excepturi possimus
            veritatis, dolores tempore! Voluptatibus repellendus maxime minus
            excepturi earum! Necessitatibus ab rerum consectetur eveniet
            possimus atque laborum praesentium similique? Minus vel odit tempore
            voluptatem neque debitis ducimus ipsa quia excepturi porro. Aliquam
            natus pariatur architecto sed accusamus facilis dolorum accusantium,
            explicabo consequuntur doloribus tenetur at quod reprehenderit
            recusandae, quisquam asperiores id quam, voluptatem animi ullam sit
            exercitationem! Molestiae cumque excepturi ipsam quae nesciunt,
            saepe facere, consequatur suscipit aperiam dolores nisi magni,
            asperiores non! Fuga aliquam at fugit inventore. Aspernatur tenetur
            perferendis doloremque molestias dolore error tempore temporibus
            tempora, enim eaque, ullam at rerum eum repellat blanditiis
            officiis. Voluptatem!
          </p>
          <br />
          <p className="post-content__section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            facilis nulla ullam ab ipsa fuga, harum tempore magnam iste illum
            labore quae nisi quas quibusdam quam sapiente deserunt eius suscipit
            provident animi! Ex harum excepturi sapiente natus, illum beatae
            perspiciatis fugiat quis quisquam tempora impedit, dicta nisi
            dolorum eveniet. Enim, labore ut maiores in rem tempore a.
            Inventore, nisi? Facilis perferendis quae possimus corrupti sapiente
            nihil nobis, atque ducimus. Illum quibusdam maiores deserunt vero
            ratione quos animi esse! Cupiditate, eveniet officia quod ea
            repellat iusto facere in ad, esse eos ducimus possimus nisi nihil
            animi! Quae maiores impedit mollitia officiis excepturi possimus
            veritatis, dolores tempore! Voluptatibus repellendus maxime minus
            excepturi earum! Necessitatibus ab rerum consectetur eveniet
            possimus atque laborum praesentium similique? Minus vel odit tempore
            voluptatem neque debitis ducimus ipsa quia excepturi porro. Aliquam
            natus pariatur architecto sed accusamus facilis dolorum accusantium,
            explicabo consequuntur doloribus tenetur at quod reprehenderit
            recusandae, quisquam asperiores id quam, voluptatem animi ullam sit
            exercitationem! Molestiae cumque excepturi ipsam quae nesciunt,
            saepe facere, consequatur suscipit aperiam dolores nisi magni,
            asperiores non! Fuga aliquam at fugit inventore. Aspernatur tenetur
            perferendis doloremque molestias dolore error tempore temporibus
            tempora, enim eaque, ullam at rerum eum repellat blanditiis
            officiis. Voluptatem!
          </p>
          <br />
          <p className="post-content__section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            facilis nulla ullam ab ipsa fuga, harum tempore magnam iste illum
            labore quae nisi quas quibusdam quam sapiente deserunt eius suscipit
            provident animi! Ex harum excepturi sapiente natus, illum beatae
            perspiciatis fugiat quis quisquam tempora impedit, dicta nisi
            dolorum eveniet. Enim, labore ut maiores in rem tempore a.
            Inventore, nisi? Facilis perferendis quae possimus corrupti sapiente
            nihil nobis, atque ducimus. Illum quibusdam maiores deserunt vero
            ratione quos animi esse! Cupiditate, eveniet officia quod ea
            repellat iusto facere in ad, esse eos ducimus possimus nisi nihil
            animi! Quae maiores impedit mollitia officiis excepturi possimus
            veritatis, dolores tempore! Voluptatibus repellendus maxime minus
            excepturi earum! Necessitatibus ab rerum consectetur eveniet
            possimus atque laborum praesentium similique? Minus vel odit tempore
            voluptatem neque debitis ducimus ipsa quia excepturi porro. Aliquam
            natus pariatur architecto sed accusamus facilis dolorum accusantium,
            explicabo consequuntur doloribus tenetur at quod reprehenderit
            recusandae, quisquam asperiores id quam, voluptatem animi ullam sit
            exercitationem! Molestiae cumque excepturi ipsam quae nesciunt,
            saepe facere, consequatur suscipit aperiam dolores nisi magni,
            asperiores non! Fuga aliquam at fugit inventore. Aspernatur tenetur
            perferendis doloremque molestias dolore error tempore temporibus
            tempora, enim eaque, ullam at rerum eum repellat blanditiis
            officiis. Voluptatem!
          </p>
          <br />
          <img
            src="https://images.unsplash.com/photo-1664574654578-d5a6a4f447bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="post-content__img"
          />
          <div className="post-content__img-name">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            cum ullam asperiores quod, libero veniam sapiente odit
          </div>
          <h1 className="post-content__title">Chương 2</h1>
          <p className="post-content__section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            facilis nulla ullam ab ipsa fuga, harum tempore magnam iste illum
            labore quae nisi quas quibusdam quam sapiente deserunt eius suscipit
            provident animi! Ex harum excepturi sapiente natus, illum beatae
            perspiciatis fugiat quis quisquam tempora impedit, dicta nisi
            dolorum eveniet. Enim, labore ut maiores in rem tempore a.
            Inventore, nisi? Facilis perferendis quae possimus corrupti sapiente
            nihil nobis, atque ducimus. Illum quibusdam maiores deserunt vero
            ratione quos animi esse! Cupiditate, eveniet officia quod ea
            repellat iusto facere in ad, esse eos ducimus possimus nisi nihil
            animi! Quae maiores impedit mollitia officiis excepturi possimus
            veritatis, dolores tempore! Voluptatibus repellendus maxime minus
            excepturi earum! Necessitatibus ab rerum consectetur eveniet
            possimus atque laborum praesentium similique? Minus vel odit tempore
            voluptatem neque debitis ducimus ipsa quia excepturi porro. Aliquam
            natus pariatur architecto sed accusamus facilis dolorum accusantium,
            explicabo consequuntur doloribus tenetur at quod reprehenderit
            recusandae, quisquam asperiores id quam, voluptatem animi ullam sit
            exercitationem! Molestiae cumque excepturi ipsam quae nesciunt,
            saepe facere, consequatur suscipit aperiam dolores nisi magni,
            asperiores non! Fuga aliquam at fugit inventore. Aspernatur tenetur
            perferendis doloremque molestias dolore error tempore temporibus
            tempora, enim eaque, ullam at rerum eum repellat blanditiis
            officiis. Voluptatem!
          </p>
          <div className="author">
            <img
              src="https://images.unsplash.com/photo-1643754017436-88660f040275?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
            <div className="author-info">
              <h1>Jake Sullian</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium enim, nemo repellendus quam molestias ad eveniet
                rerum nihil nisi totam maxime eaque dignissimos commodi harum,
                voluptates dolore vero. Optio, incidunt.
              </p>
            </div>
          </div>
        </div>
        <SectionHeader color="#23BB86">Bài viết liên quan</SectionHeader>
        <RandomPosts></RandomPosts>
      </StyledDetailPage>
    </HomeLayout>
  );
};

export default DetailPage;
