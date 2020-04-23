using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    /*public float speed;*/
    public float maxSpeed = 2f;
    bool facingLeft = false;
    private Animator animator;

    private Rigidbody2D rb2d;

    Vector3 Velocity;

    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponent<Animator>();
        rb2d = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        float move = Input.GetAxis("Horizontal");

        rb2d.velocity = new Vector3(move * maxSpeed, rb2d.velocity.y);
        if (move <= 0.5 && move >= -0.5)
        {
            //animator.SetBool("idle", true);
            animator.Play("idle");
        }
        else
        {
            //animator.SetBool("idle", false);
            animator.Play("run");
        }

        if (move < 0 && !facingLeft)
        {
            Flip();
        }
        else if (move > 0 && facingLeft)
        {
            Flip();
        }
    }

    void Flip()
    {
        facingLeft = !facingLeft;
        Vector3 scale = transform.localScale;
        scale.x *= -1;
        transform.localScale = scale;
    }
}
