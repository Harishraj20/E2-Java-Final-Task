package com.task.Repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.task.Model.User;

@Repository
public class UserRepository {

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    public String addUserInfo(String name, String password) {
        User existingUser = checkExistingUser(name, password);

        if (existingUser != null) {
            return "User Already Exists!";
        }
        try {
            Session session = sessionFactory.getCurrentSession();
            User user = new User(name, password);
            session.save(user);
            return "User \"" + user.getUserName() + "\" Created Successfully!!";
        } catch (HibernateException e) {
            System.out.println(e);
            return "Corrupted";
        }
    }

    @Transactional
    public List<User> getUsers() {
        Session session = sessionFactory.openSession();
        List<User> users = null;

        try {
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.gt("visitCount", 0));
            users = criteria.list();
        } catch (HibernateException e) {
            System.out.println(e);
        }
        return users;
    }

    @Transactional
    public String validateLogin(String name, String password) {
        Session session = sessionFactory.getCurrentSession();
        String message = "Invalid Credentials... Please check username or Password!!";

        try {
            User existingUser = checkExistingUser(name, password);

            if (existingUser != null) {

                existingUser.setVisitCount(existingUser.getVisitCount() + 1);
                existingUser.setLastLogin(LocalDateTime.now());

                session.update(existingUser);

                message = "User \"" + existingUser.getUserName() + "\" has Logged in Successfully.";

            }
        } catch (HibernateException e) {
            System.out.println(e);
        }

        return message;
    }

    public User checkExistingUser(String name, String password) {
        Session session = sessionFactory.getCurrentSession();

        try {
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("userName", name));
            criteria.add(Restrictions.eq("password", password));
            User user = (User) criteria.uniqueResult();

            return user;
        } catch (HibernateException e) {
            System.out.println("error: " + e);
            return null;
        }
    }

}
